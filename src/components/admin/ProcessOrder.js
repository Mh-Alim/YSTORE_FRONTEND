import AccountTree from '@mui/icons-material/AccountTree'
import { Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getOrderDetails,clearErrors,updateOrder } from '../../actions/orderAction'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstants'
import { ToastCallError, ToastCallSuccess } from '../../ReactToast'
import MetaData from '../Layouts/Header/MetaData'
import Loader from '../Layouts/Loader/Loader'
import Siderbar from './SiderBar'
import "./ProcessOrder.css"



const ProcessOrder = () => {

  const [status, setStatus] = useState("");
  const {id} = useParams();
  const naviagate = useNavigate();
  const dispatch = useDispatch();
  const {order,error,loading} = useSelector(state => state.orderDetails);
  const {error : updateError, isUpdated} = useSelector(state => state.order);


  const updateOrderSubmitHandler = (e)=>{
    e.preventDefault();
    const myForm  = new FormData();
    myForm.set("status",status);
    dispatch(updateOrder(id,myForm));
  }
  
  useEffect(()=>{
    if(error){
      ToastCallError(error);
      dispatch(clearErrors());
    }
    if(updateError){
      ToastCallError(updateError);
      dispatch(clearErrors());
    }
    if(isUpdated){
      ToastCallSuccess("Order Updated SuccessFully ");
      dispatch({type: UPDATE_ORDER_RESET});
    }

    dispatch(getOrderDetails(id));
  },[error,updateError,dispatch,isUpdated,id])







  return (
    <>
      <MetaData title="Process Order"  />
      <div className="dashboard">
        <Siderbar />
        <div className="newProductContainer">
          {loading ? (<Loader />):( <div style={{
            display: order && order.orderStatus === "Delivered" ? "block" : "grid"
          }} className='confirmOrderPage'>
            <div>
              <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name : </p>
                    <span>{order && order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone : </p>
                    <span>
                      {order && order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div>
                    <p>Address : </p>
                    <span>
                      {order && order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>

                <Typography>Payment</Typography>

                <div className="orderDetailsContainerBox">
                  <div>
                    <p className={order && order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor":"redColor"} >
                      {order && order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order && order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>


                <Typography>Order Status </Typography>

                <div className="orderDetailsContainerBox">
                  <div>
                    <p className={order && order.orderStatus && order.orderStatus === "Delivered" ? "greenColor":"redColor"} >
                      {order && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>


              <div className="confirmCartItems">
                <Typography>Your Cart Items:</Typography>
                <div className="confirmCartItemsContainer">
                  {order && order.orderItems && order.orderItems.map((item)=> (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>
                      <span>
                        {item.quantity} X {item.price} Rs. = <b>{item.price*item.quantity} Rs</b>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order && order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>

          </div>)}
        </div>
      </div>
    </>
  )
}

export default ProcessOrder