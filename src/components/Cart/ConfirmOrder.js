import React from 'react'
import "./ConfirmOrder.css"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import MetaData from "../Layouts/Header/MetaData"
import { useDispatch, useSelector } from 'react-redux'
import CheckOutSteps from './CheckOutSteps'
import Loader from '../Layouts/Loader/Loader'

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const {user,loading} = useSelector(state => state.user);
    const {cartItems,shippingInfo} = useSelector(state => state.cart);

    const subtotal = cartItems.reduce((acc,item)=>
    acc+item.quantity*item.price,0
    );
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal*0.18;  // gst taking 18%
    const totalPrice = subtotal+tax+shippingCharges;
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = (e) => {
        e.preventDefault();
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice
        }

        sessionStorage.setItem("orderInfo",JSON.stringify(data));
        navigate("/process/payment");
    }
  return (
    <>{loading ? <Loader />: <><MetaData title="Confirm Order" />
    <CheckOutSteps activeStep={2} />
    <div className="confirmOrderPage">
        <div>
            <div className="confirmshippingArea">
                <Typography>Shipping Info</Typography>
                <div className="confirmshippingAreaBox">
                    <div>
                        <p>Name :</p>
                        <span>{user.name}</span>
                    </div>
                    <div>
                        <p>Phone :</p>
                        <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Address :</p>
                        <span>{address}</span>
                    </div>
                </div>
            </div>
            <div className="confirmCartItems">
                <Typography> Your Cart Items : </Typography>
                <div className="confirmCartItemsContainer">
                    {cartItems && cartItems.map((item) => (
                        <div key={item.product_id}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.product_id}`}>
                                {item.name}
                            </Link>
                            <span>
                                {item.quantity} X {item.price} Rs = <b>{item.price * item.quantity} Rs.</b>
                            </span>
                        </div>

                    ))}
                </div>
            </div>
        </div>

        <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
                <div>
                    <p>Subtotal:</p>
                    <span>{subtotal} Rs</span>
                </div>
                <div>
                    <p>Shipping Charges:</p>
                    <span>{shippingCharges} Rs.</span>
                </div>
                <div>
                    <p>GST:</p>
                    <span>{tax} Rs.</span>
                </div>
            </div>
            <div className="orderSummaryTotal">
                <p>
                    <b>Total:</b>
                </p>
                <span>{totalPrice} Rs.</span>
            </div>

            <button onClick={proceedToPayment} >Proceed To Payment</button>
        </div>
        
    </div></>}

        

    </>
  )
}

export default ConfirmOrder