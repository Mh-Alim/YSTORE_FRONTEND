import React from 'react'
import { Link } from 'react-router-dom'

import "./CartItemCard.css"


const CardItemCard = ({item,deleteItemsFromCart}) => {

  return (
    <div className='CartItemCard'>
        <img src={item.image} alt="ssa" />
        <div>
            <Link to={`/product/${item.product_id}`}>{item.name}</Link>
            <span>{`Price : ${item.price} Rs.`}</span>
            <p onClick={()=>deleteItemsFromCart(item.product_id)}>Remove</p>
        </div>
    </div>
  )
}

export default CardItemCard