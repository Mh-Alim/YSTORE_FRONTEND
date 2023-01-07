import React,{useEffect,useState} from 'react'
import "./ProductDetails.css"
import Carousel from "react-material-ui-carousel"
import {useSelector,useDispatch} from "react-redux"
import { getProductDetails } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard'
import MetaData from '../Layouts/Header/MetaData'
import {addToCart} from "../../actions/cartAction"
import {ToastCallSuccess} from "../../ReactToast"

const ProductDetails = () => {
    

    const [productCount,setProductCount] = useState(1);

    

    const {id} = useParams();
    const dispatch = useDispatch();

    const {product,loading,error} = useSelector((state)=>state.productDetails);



    const addToCartHandler = ()=>{
        dispatch(addToCart(id,productCount));
        ToastCallSuccess("Item added to cart")
    }

    const increment = ()=>{
        let qty = productCount+1;
        if(qty > product.stock) return;
        setProductCount(qty);
    }
    const decrement = ()=>{
        let qty = productCount-1;
        if(qty === 0) return;
        setProductCount(qty);
    }
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
                        <button onClick={decrement}>-</button>
                        <input readOnly type="number" value={productCount} />
                        <button onClick={increment}>+</button>
                    </div>
                    <button onClick={addToCartHandler}><i class="fa fa-shopping-cart" aria-hidden="true"></i>Add to Cart</button>
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