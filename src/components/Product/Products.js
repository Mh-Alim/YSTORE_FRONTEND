import "./Products.css"
import React,{useEffect, useState} from 'react';
import Loader from "../Layouts/Loader/Loader";
import {useSelector,useDispatch} from "react-redux";
import {getProducts} from "../../actions/productActions";
import ProductCard from "../FeaturedProducts/ProductCard";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
// import Slider from ""
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import MetaData from "../Layouts/Header/MetaData"
// react toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhone",
];


const Products = () => {
    const dispatch = useDispatch();
    const {loading,error,products,resultPerPage,filteredProductsCount} = useSelector((state) => state.products);
    const [currentPage, setCurrentPage] = useState(1);
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState([0,60000])  ;
    const [ratings, setRatings] = useState(0)

    const setCurrentPageNo = (e)=>{
      console.log(e);
      setCurrentPage(e);
    }

    const priceHandler = (event,newPrice)=>{
      setPrice(newPrice)
    }



    const {keyword} = useParams()
    useEffect(() => {

      if(error){

        return toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
      dispatch(getProducts(keyword,currentPage,price,category,ratings));
     
    }, [dispatch,keyword,currentPage,price,category,ratings,error])
    
  return (
    <>
    {loading ? <Loader /> : <>
      <MetaData title="ALL PRODUCTS" />
      <h2 className="productsHeading">
        Products
      </h2>

      <div className="products">
        {products && products.map((product)=> <ProductCard key={product._id} product = {product} />)}
      </div>
      <div className="filterBox">
        <Typography>
            Price 
        </Typography>
        <Slider
          value = {price}
          onChange = {priceHandler}
          valueLabelDisplay = "auto"
          aria-labelledby="range-slider"
          min={1}
          max={50000}
          />

          {/* for categories */}
        <Typography>
            Category
        </Typography>
        <ul className="categoryBox">
            {categories.map((category)=>{
              return <li className="category-link" key={category} onClick={()=>setCategory(category)}>{category}</li>
            })}
        </ul> 

            {/* for ratings  */}

        <fieldset>
        <Typography component="legend">
            Ratings Above
        </Typography>
        <Slider
          aria-label="Temperature"
          value={ratings}
          onChange = {(e,newRating)=> {
            setRatings(newRating);
          }}
          // getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={5}
        />
        </fieldset>

        </div>  
      {resultPerPage < filteredProductsCount ? <div className="paginationBox">
        <Pagination 
          activePage= {currentPage}
          itemsCountPerPage = {resultPerPage}
          totalItemsCount = {filteredProductsCount} 
          onChange = {setCurrentPageNo}
          nextPageText = "next"
          prevPageText = "prev"
          firstPageText = "1st"
          lastPageText = "Last"
          itemClass = "page-item"
          linkClass = "page-link"
          activeClass = "pageItemActive"
          activeLinkClass = "pageLinkActive"
        />
      </div> : null}


      <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    </>
    }
    </>
  )
}

export default Products