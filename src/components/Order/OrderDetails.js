import { Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import { getOrderDetails } from '../../actions/orderAction';
import { clearErrors } from '../../actions/userActions';
import { ToastCallError, ToastCallSuccess } from '../../ReactToast';
import MetaData from '../Layouts/Header/MetaData';
import Loader from '../Layouts/Loader/Loader';


const OrderDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const {order,error,loading} = useSelector(state=>state.orderDetails);

 

    useEffect(() => {
        if(error){
            ToastCallError(error);
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(id))
    }, [dispatch,error])
    











  return (
    <>
      {loading ? <Loader /> : <>

        <MetaData title= "Order Details" />
        <div className="orderDetailsPage">
          <div className="orderDetailsContainer">
            <Typography component="h1">
              Order #{order && order._id}
            </Typography>
            <Typography>
              Shipping Info
            </Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p>Name : </p>
                <span>{order.user && order.user.name }</span>
              </div>
              <div>
                <p>Phone : </p>
                <span>
                  {order.shippingInfo && order.shippingInfo.phoneNo }
                </span>
              </div>
              <div>
                <p>Address : </p>
                <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state},${order.shippingInfo.pinCode}`}</span>

              </div>
            </div>

            <Typography>Payment</Typography>
            <div className="orderDetailsContainerBox">
              <div>
                <p className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor":"redColor"}>
                  {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}

                </p>

              </div>

              <div>
                <p>Amount:</p>
                <span>{order.totalPrice && order.totalPrice}</span>
              </div>
            </div>

            <Typography>
              Order Status
            </Typography>

            <div className="orderDetailsContainerBox">
              <div>
                <p className={order && order.orderStatus === "Delivered" ? "greenColor":"redColor"}>
                  {order && order.orderStatus}
                </p>

              </div>
            </div>
          </div>

          <div className="orderDetailsCartItems">
            <Typography>
              Order Items: 
            </Typography>
            <div className="orderDetailsCartItemsContainer">
              {order.orderItems && order.orderItems.map((item)=>(
                <div>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                  <span>
                    {item.quantity} X {item.price} Rs = <b>{item.price * item.quantity} Rs</b>
                  </span>
                </div>
                
              ))}
            </div>
          </div>
        </div>
      </>}
    </>
  )
}

export default OrderDetails