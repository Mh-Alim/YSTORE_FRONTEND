import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeItemFromCart } from '../../actions/cartAction'
import { ToastCallSuccess } from '../../ReactToast'
import "./Cart.css"
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CardItemCard from './CartItemCard'
import { Link, useNavigate } from 'react-router-dom'
import { Typography } from '@mui/material'

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {cartItems} = useSelector(state=>state.cart);

    const incrementProduct = (id,quantity,stock) =>{
        console.log("coming")
        let newQuantitity = quantity+1;
        if(newQuantitity > stock){
            return;
        }
        dispatch(addToCart(id,newQuantitity));
    }
    const decrementProduct = (id,quantity) =>{
        if(quantity === 1 ) return;
        let newQuantitity = quantity-1;
        dispatch(addToCart(id,newQuantitity));
    }


    const deleteItemsFromCart = (id)=>{
        dispatch(removeItemFromCart(id));
        ToastCallSuccess("Item removed from cart");
    }


    const checkOutHandler = ()=>{
        navigate("/login?redirect=shipping")
    }
  return (
    <>
        {cartItems.length === 0 ? (

            <div className="emptyCart">

                <RemoveShoppingCartIcon />
                <Typography>No Product in Your Cart</Typography>
                <Link to = "/products">View Products</Link>
            </div>
        ):(
        <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {cartItems && cartItems.map(item=>(
                <div className="cartContainer" key={item.product_id}>
                <CardItemCard item = {item} deleteItemsFromCart = {deleteItemsFromCart} />
                <div className="cartInput">
                    <button  onClick={()=>decrementProduct(item.product_id,item.quantity)}>-</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={()=>incrementProduct(item.product_id,item.quantity,item.stock)}>+</button>
                </div>
                <div className="cartSubtotal">{`${item.price*item.quantity} Rs.`}</div>
            </div>
            ))}

            <div className="cartGrossTotal">
                <div></div>
                <div className="cartGrossTotalBox">
                    <p>Gross Total</p>
                    <p>{`${cartItems.reduce((accum,item)=> accum+item.price*item.quantity,0)} Rs.`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button onClick={checkOutHandler}>Check Out</button>
                </div>
            </div>
        </div>
        )}
        
    </>
  )
}

export default Cart