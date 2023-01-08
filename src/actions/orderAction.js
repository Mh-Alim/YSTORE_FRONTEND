import axios from "axios";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST,CLEAR_ERRORS, CREATE_ORDER_SUCCESS, } from "../constants/orderConstants";


export const createOrder = (order)=> async(dispatch)=>{


    try {
        dispatch({type : CREATE_ORDER_REQUEST});

        const config = {
            headers : {
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post("/api/v1/order/new",order,config);

        dispatch({type : CREATE_ORDER_SUCCESS, payload : data});
    }
    catch(error){
        dispatch({
            type : CREATE_ORDER_FAIL,
            payload : error.response.data.message
        })
    }
}



// CLEAR ERRORS
export const clearErrors = ()=>{
    
    return (dispatch)=>{
        dispatch({
            type : CLEAR_ERRORS
        })
    }

    
}