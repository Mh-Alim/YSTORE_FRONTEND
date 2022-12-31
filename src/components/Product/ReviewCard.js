import React from 'react'
import ReactStars from 'react-rating-stars-component'
import userImg from "../../imgs/userImg.jpg"
import "./ProductDetails.css"

const ReviewCard = ({review}) => {


    const options = {
        edit : false,
        activeColor : "#FFFF00",
        value : review.rating,
        isHalf : true,
        size: window.innerWidth < 600 ? 20 : 15,
    }
  return (
    <div className='reviewCard'>
        <img src={userImg} alt="" />
        <p>{review.name}</p>
        <p className='reactStars'><ReactStars {...options}/></p>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard