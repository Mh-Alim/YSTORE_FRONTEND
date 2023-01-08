import { Typography } from '@mui/material'
import "./Payment.css"
import React,{useState,useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastCallError, ToastCallSuccess } from '../../ReactToast'
import MetaData from '../Layouts/Header/MetaData'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
}from "@stripe/react-stripe-js"
import axios from "axios"
import "./Payment.css"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CheckOutSteps from './CheckOutSteps'

import { useNavigate } from 'react-router-dom'
import {clearErrors, createOrder} from "../../actions/orderAction"


const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const {shippingInfo,cartItems} = useSelector(state=>state.cart);
  const {user} = useSelector(state=>state.user);
  const {error} = useSelector(state => state.newOrder);


 


  const order = {
    shippingInfo,
    orderItems : cartItems,
    itemsPrice : orderInfo.subtotal,
    taxPrice : orderInfo.tax,
    totalPrice : orderInfo.totalPrice,
    shippingPrice : orderInfo.shippingCharges,
  }
  
  const submitHandler = async(e) => {
    e.preventDefault();

    payBtn.current.disabled = true;
    try {
      const config = {
        headers : {
          "Content-Type" : "application/json",
        },
      } 
      const paymentData = {
        amount : Math.round(orderInfo.totalPrice * 100)
      }

      const {data} = await axios.post("/api/v1/payment/process",paymentData,config);

      const client_secret = data.client_secret;

      if(!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method : {
          card : elements.getElement(CardNumberElement),
          billing_details : {
            name : user.name,
            email : user.email,
            address : {
              line1 : shippingInfo.address,
              city : shippingInfo.city,
              state : shippingInfo.state,
              postal_code : shippingInfo.pinCode,
              country : shippingInfo.country
            }
          }
        }
      });

      if(result.error) {
        payBtn.current.disabled = false;
        ToastCallError(result.error.message)
      }
      else {
        if(result.paymentIntent.status === "succeeded"){
          order.paymentInfo = {
            id : result.paymentIntent.id,
            status : result.paymentIntent.status
          }
          dispatch(createOrder(order))
          navigate("/success");
        }
        else {
          ToastCallError("There is some issue while processing payment")
        }
      }
    }
    catch(error){
      payBtn.current.disabled = false;
      ToastCallError(error.response.data.message);
    }
  }



  useEffect(() => {
    if(error){
      ToastCallError(error);
      dispatch(clearErrors());
    }
  }, [dispatch,error])
  
    
  
  return (
    <>
  
      <MetaData title="Payment" />
      <CheckOutSteps activeStep={3} />
      <div className="paymentContainer">
        <form action="" className="paymentForm" onSubmit={(e)=>submitHandler(e)}>
            <Typography >Card Info</Typography>
            <div>
                <CreditCardIcon />
                <CardNumberElement className='paymentInput' />
            </div>
            <div>
                <EventIcon />
                <CardExpiryElement className='paymentInput' />
            </div>
            <div>
                <VpnKeyIcon />
                <CardCvcElement className='paymentInput' />
            </div>

            <input ref={payBtn} type="submit" value={`Pay - ${orderInfo && orderInfo.totalPrice} Rs`} />
        </form>
      </div>




    </>
  )
}

export default Payment