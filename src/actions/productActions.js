import axios from "axios"
import { ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,ALL_PRODUCT_REQUEST, CLEAR_ERRORS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";

export const getProducts = (keyword = "",currentPage = 1,price = [0,25000],category,ratings = 0)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type : ALL_PRODUCT_REQUEST,
            })
            let link ;
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            if(category) link =  `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            const {data} = await axios.get(link);
            console.log(data);
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload : data,
            });

        }
        catch(error){
            console.log(error);
            dispatch({
                type : ALL_PRODUCT_FAIL,
                payload : error.response.data.message
            })
        }

    }
}


// clearing errors
export const clearErrors = ()=>{
    
    console.log("clear Errors");
    return (dispatch)=>{
        dispatch({
            type : CLEAR_ERRORS
        })
    }

    
}

// check this is working or not

// export const clearErrorCheck = ()=>{
//     return {
//         type : CLEAR_ERRORS,
//     }
// }


// get single product
export const getProductDetails = (id)=>{
    return async (dispatch)=>{
        try{
            dispatch({
                type : PRODUCT_DETAILS_REQUEST,
            })
            const {data} = await axios.get(`/api/v1/product/${id}`);
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload : data.product,
            });

        }
        catch(error){
            console.log(error);
            dispatch({
                type : PRODUCT_DETAILS_FAIL,
                payload : error.response.data.message
            })
        }

    }
}