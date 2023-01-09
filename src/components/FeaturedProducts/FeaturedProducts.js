import React,{useEffect}  from 'react'
import "./FeaturedProducts.css"
import ProductCard from './ProductCard'
import {  getProducts } from '../../actions/productActions'
import {useSelector,useDispatch} from "react-redux"
import Loader from '../Layouts/Loader/Loader'
import {ToastCallError} from "../../ReactToast"
// react toastify 
import 'react-toastify/dist/ReactToastify.css';


const FeaturedProducts = () => {

  
  const dispatch = useDispatch();
  const {loading,products,error} = useSelector((state)=> state.products);
  
 
  useEffect(() => {

    if(error){
      return ToastCallError(error)   
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
</div> }
  </>
    
  )
}

export default FeaturedProducts