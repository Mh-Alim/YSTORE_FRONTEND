import {combineReducers,applyMiddleware} from "redux";
import {configureStore} from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productReducer,productDetailsReducer } from "./reducers/productReducer";
import { userReducer,profileReducer,forgetPasswordReducer  } from "./reducers/userReducer";
import { cartReducer  } from "./reducers/cartReducers";


console.log(productReducer);

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailsReducer,
    user : userReducer,
    profile : profileReducer,
    forgetPassword : forgetPasswordReducer,
    cart : cartReducer
});

let cartInfo = () => {
    let y =  localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [] 
    console.log("cart Info ",y);
    return y;
}
let initialState = {
    cart : {
        cartItems : cartInfo()
    }
};

const middleware = [thunk];

const store = configureStore({reducer,preloadedState:  initialState},composeWithDevTools(applyMiddleware(...middleware)));


export default store;


