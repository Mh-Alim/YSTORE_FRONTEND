import React from "react";
import "./FeaturedProducts.css"
import shirt from "../../imgs/shirt.jpg"
import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom";



const ProductCard = ({product}) => {
    const options = {
        edit : false,
        activeColor : "#FFFF00",
        value : product.ratings,
        isHalf : true,
        size: window.innerWidth < 600 ? 20 : 15,
    }
  return (
    <Link className="product" to={`/product/${product._id}`}>
        <img src={shirt} alt="" />
        <div className="productContent">
            <h3>{product.name}</h3>
            <div className="rating"><span className="stars"><ReactStars {...options} /></span> <span className="reviewText">({product.numOfReviews} Reviews)</span></div>
            <p className="price white">{product.price} Rs.</p>
        </div>

    </Link>
  )
}

export default ProductCard