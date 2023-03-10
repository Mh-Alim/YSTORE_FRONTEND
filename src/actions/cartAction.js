
import axios from "axios";
import { ADD_TO_CART, REMOVE_CARD_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstants";




// ADD TO CART
export const addToCart = (id,quantity) => async (dispatch,getState)=>{


    
    const {data} = await axios.get(`/api/v1/product/${id}`);
    dispatch({type : ADD_TO_CART,payload : {
        product_id : data.product._id,
        name : data.product.name,
        price : data.product.price,
        image : data.product.images[0].url,
        stock : data.product.stock,
        quantity
    }});



    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}


// REMOVE ITEM FROM CART

export const removeItemFromCart = (id)=> (dispatch,getState) => {
    dispatch({type: REMOVE_CARD_ITEM,payload : id});
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}


// SAVING SHIPPING INFORMATION

export const saveShippingInfo = (data) => (dispatch)=>{
    dispatch({type : SAVE_SHIPPING_INFO,payload : data});


    localStorage.setItem("shippingInfo",JSON.stringify(data));
}