import React,{useEffect}  from 'react'
import "./FeaturedProducts.css"
import ProductCard from './ProductCard'
import { clearErrors, getProducts } from '../../actions/productActions'
import {useSelector,useDispatch} from "react-redux"
import Loader from '../Layouts/Loader/Loader'

// react toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const FeaturedProducts = () => {

  
  const dispatch = useDispatch();
  const {loading,products,error,productsCount} = useSelector((state)=> state.products);
  
 
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
    dispatch(getProducts())
  }, [dispatch,error]);

  
  return (
    <> { loading ? <Loader/> : <div className='FeaturedProducts'>
    <div className="heading">Featured Products</div>
    <div className="products">
      {products && products.map((product)=> {
        return <ProductCard product={product} key= {product._id}/>
      })}

    </div>
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
</div> }
  </>
    
  )
}

export default FeaturedProducts