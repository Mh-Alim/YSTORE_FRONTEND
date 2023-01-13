import { Rating } from '@mui/material'
import React from 'react'
import userImg from "../../imgs/userImg.jpg"
import "./ProductDetails.css"


const ReviewCard = ({review}) => {



    const options = {
      value : review.rating,
      size: "small",
      readOnly : true,
      precision : 0.5,
  }
  return (
    <div className='reviewCard'>
        <img src={userImg} alt="" />
        <p>{review.name}</p>
        <p><Rating className='detailsReviewStar' {...options}/></p>
        <span >{review.comment}</span>
    </div>
  )
}

export default ReviewCard