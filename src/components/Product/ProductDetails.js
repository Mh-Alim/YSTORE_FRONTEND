import React,{useEffect,useState} from 'react'
import "./ProductDetails.css"
import Carousel from "react-material-ui-carousel"
import {useSelector,useDispatch} from "react-redux"
import { getProductDetails } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard'
import MetaData from '../Layouts/Header/MetaData'

const ProductDetails = () => {
    
    const {id} = useParams();
    console.log(id)
    const dispatch = useDispatch();

    const {product,loading,error} = useSelector((state)=>state.productDetails);
    useEffect(() => {
      dispatch(getProductDetails(id));
    }, [dispatch,id])
    
    const options = {
        edit : false,
        activeColor : "#FFFF00",
        value : product.ratings,
        isHalf : true,
        size: window.innerWidth < 600 ? 20 : 30,
    }
  return (
    <>
    <MetaData title={`${product.name} in YSTORE`} />
    <div className='ProductDetails'>
        <div className='carouselImageDiv'>
            <Carousel>
                {
                    product.images && product.images.map((item,i)=><img className='CarouselImage' key={item.url} src={item.url} alt={`${i} Slide`} />)
                }
            </Carousel>
        </div>

        <div className='detailsBlock'>
            <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p> Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
                <h1> {product.price} Rs </h1>
                <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                        <button>-</button>
                        <input type="number" value="1" />
                        <button>+</button>
                    </div>
                    <button><i class="fa fa-shopping-cart" aria-hidden="true"></i>Add to Cart</button>
                </div>
                <p>Status : <b className={product.stock < 1 ? "redColor": "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "InStock"}
                    </b></p>
            </div>
            <div className="detailBlock-4">
                Desciption : {product.description}
            </div>

            <button className='submitReview'> Submit Review </button>
        </div>

        
    </div>
    <div className="reviews">
        <h2>Reviews</h2>
        {product.reviews && product.reviews[0] ? (
            <div className="reviewCardHolder">
                { product.reviews.map((review)=> <ReviewCard review = {review}/>)}
            </div>
        ) : <p className='noReviews'>No Reviews Yet</p> }
    </div>

    </>
  )
}

export default ProductDetails