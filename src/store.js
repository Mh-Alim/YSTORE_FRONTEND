import {combineReducers,applyMiddleware} from "redux";
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productsReducer,newReviewReducer,productDetailsReducer, newProductReducer, productReducer, productReviewsReducer, reviewReducer } from "./reducers/productReducer";
import { userReducer,profileReducer,forgetPasswordReducer, allUserReducer, userDetailsReducer  } from "./reducers/userReducer";
import { cartReducer  } from "./reducers/cartReducers";
import {newOrderReducer,myOrderReducer,orderDetailsReducer, allOrdersReducer, orderReducer  } from "./reducers/orderReducers";


const reducer = combineReducers({
    products : productsReducer,
    productDetails : productDetailsReducer,
    user : userReducer,
    profile : profileReducer,
    forgetPassword : forgetPasswordReducer,
    cart : cartReducer,
    newOrder : newOrderReducer,
    myOrders : myOrderReducer,
    orderDetails : orderDetailsReducer,
    newReview :  newReviewReducer,
    newProduct : newProductReducer,
    product : productReducer,
    allOrders : allOrdersReducer,
    order : orderReducer,
    allUsers : allUserReducer,
    userDetails : userDetailsReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer

});

let cartInfo = () => {
    let y =  localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [] 
    console.log("cart Info ",y);
    return y;
}

let shipping = ()=>{
    let data = localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {};
    return data;
}
let initialState = {
    cart : {
        cartItems : cartInfo(),
        shippingInfo : shipping()
    }
};

const middleware = [thunk];

const store = configureStore({reducer,preloadedState:  initialState},composeWithDevTools(applyMiddleware(...middleware)));


export default store;


