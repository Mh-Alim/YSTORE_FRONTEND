import React from "react";
import "./FeaturedProducts.css"
import shirt from "../../imgs/shirt.jpg"
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";



const ProductCard = ({product}) => {
  const options = {
    value : product.ratings,
    size: "small",
    readOnly : true,
    precision : 0.5,
    
}
  return (
    <Link className="product" to={`/product/${product._id}`}>
        <img src={shirt} alt="" />
        <div className="productContent">
            <h3>{product.name}</h3>
            <div className="rating">
              <span className="stars">
              <Rating {...options} />
              </span> 
              <span className="reviewText">
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <p className="price white">{product.price} Rs.</p>
        </div>

    </Link>
  )
}

export default ProductCard