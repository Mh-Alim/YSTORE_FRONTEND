import { ADD_TO_CART, REMOVE_CARD_ITEM } from "../constants/cartConstants";


export const cartReducer = (state = {cartItems : []},action)=>{
    switch(action.type){
        case ADD_TO_CART: 
            const item = action.payload;
            const isItemExist = state.cartItems.find((cartItem)=> cartItem.product_id === item.product_id )

            if(isItemExist){
                return {
                    ...state,
                    cartItems : state.cartItems.map((cartItem)=> cartItem.product_id === isItemExist.product_id ? item : cartItem)
                }
            }
            else {
                return {
                    ...state,
                    cartItems : [...state.cartItems,item]
                }
            }

        case REMOVE_CARD_ITEM: 
            return {
                ...state,
                cartItems : state.cartItems.filter((item)=> item.product_id !== action.payload)
                
            }


        default :
            return state;
    }
}