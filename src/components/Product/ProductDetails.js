import React,{useEffect,useState} from 'react'
import "./ProductDetails.css"
import Carousel from "react-material-ui-carousel"
import {useSelector,useDispatch} from "react-redux"
import { clearErrors, getProductDetails, newReview } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import ReviewCard from './ReviewCard'
import MetaData from '../Layouts/Header/MetaData'
import {addToCart} from "../../actions/cartAction"
import {ToastCallError, ToastCallSuccess} from "../../ReactToast"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Rating } from '@mui/material'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'







const ProductDetails = () => {
    

    const [productCount,setProductCount] = useState(1);

    

    const {id} = useParams();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")

    const {product,loading,error} = useSelector((state)=>state.productDetails);
    const {success , error: reviewError} = useSelector((state)=>state.newReview);
    // here in review --> error i am using as reviewError

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

      if(error){
        ToastCallError(error);
        dispatch(clearErrors());

      }
      if(reviewError){
        ToastCallError(reviewError);
        dispatch(clearErrors());
      }

      if(success){
        ToastCallSuccess("Review Submitted Successfully");
        dispatch({type : NEW_REVIEW_RESET});
      }
      dispatch(getProductDetails(id));
    }, [dispatch,id,success,reviewError])
    
    const options = {
        value : product.ratings,
        size: "larget",
        readOnly : true,
        precision : 0.5,
    }

    const submitReviewToggle = ()=>{
        open ? setOpen(false) : setOpen(true);
    }


    const reviewSubmitHandler = ()=>{
        const myForm = new FormData();

        myForm.set("rating",rating);
        myForm.set("comment",comment);
        myForm.set("productId",id);

        dispatch(newReview(myForm))
        setOpen(false)

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
                <h2 className='font-mono' >{product.name}</h2>
                <p className='slate font-mono'> Product # {product._id}</p>
            </div>
            <div className="detailsBlock-2 ">
                <Rating className='detailsBlock-2-rating' {...options} />
                <span className='slate'>({product.numOfReviews} Reviews)</span>
            </div>
            <div className="detailsBlock-3">
                <h1 className='roboto slate'> {product.price} Rs </h1>
                <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                        <button onClick={decrement}>-</button>
                        <input readOnly type="number" value={productCount} />
                        <button onClick={increment}>+</button>
                    </div>
                    <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}><i className="fa fa-shopping-cart" aria-hidden="true"></i>Add to Cart</button>
                </div>
                <p>Status : <b className={product.stock < 1 ? "redColor": "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "InStock"}
                    </b></p>
            </div>
            <div className="detailBlock-4">
                Desciption : {product.description}
            </div>

            <button onClick={submitReviewToggle} className='submitReview'> Submit Review!! </button>
        </div>

        
    </div>
    <div className="reviews">
        <h3 className='reviewsHeading'>Reviews</h3>

        <Dialog aria-labelledby='simple-dialog-title' open = {open} onClose={submitReviewToggle}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent>
            <Rating onChange={(e)=>setRating(e.target.value)} value={rating} size = "large"/>
            <textarea className='submitDialogTextArea' value={comment} onChange={(e)=>setComment(e.target.value)} cols="30" rows="5"></textarea>
            </DialogContent>
            
            <DialogActions>
                <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
                <Button onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>

        </Dialog>
        {product.reviews && product.reviews[0] ? (
            <div className="reviewCardHolder">
                { product.reviews.map((review,index)=> <ReviewCard key={index} review = {review}/>)}
            </div>
        ) : <p className='noReviews'>No Reviews Yet</p> }
    </div>

    </>
  )
}

export default ProductDetails