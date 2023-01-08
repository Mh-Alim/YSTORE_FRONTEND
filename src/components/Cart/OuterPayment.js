import React,{useState,useEffect} from 'react'
import Payment from './Payment'
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"
import axios from "axios"

const OuterPayment = () => {
    const [stripePublishableKey, setStripePublishableKey] = useState(null);

    const getStripeApiKey = async() => {
        const {data} = await axios.get("/api/v1/stripeApiKey");
        console.log("stripe pub key ", data);
        setStripePublishableKey(data.stripePublishableKey);
      }
    
      useEffect(() => {
        getStripeApiKey();
      }, [])
  return (
    <>
   {stripePublishableKey!=null && <Elements stripe={loadStripe(stripePublishableKey)}>
     
     <Payment />
      </Elements>
}
    </>
  )
}

export default OuterPayment