import React,{useEffect,useState} from 'react'
import "./NewProduct.css"
import {useSelector,useDispatch} from "react-redux"
import {clearErrors,createProduct, getProductDetails, updateProduct} from "../../actions/productActions"
import {ToastCallError,ToastCallSuccess} from "../../ReactToast"
import { Button } from '@mui/material'
import MetaData from "../Layouts/Header/MetaData"
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import SdStorageSharpIcon from '@mui/icons-material/SdStorageSharp';
import SpellcheckSharpIcon from '@mui/icons-material/SpellcheckSharp';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import Sidebar from "./SiderBar"
import { useNavigate, useParams } from 'react-router-dom'
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from '../../constants/productConstants'




const UpdateProduct = () => {



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {error,product} = useSelector((state)=> state.productDetails);
    const {loading , error : updateError , isUpdated} = useSelector((state)=> state.product);

    

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [oldImages, setOldImages] = useState([])

    const [imagesPreview, setImagesPreview] = useState([])
  
    const categories = [
      "Laptop",
      "Footwear",
      "Bottom",
      "Tops",
      "Attire",
      "Camera",
      "SmartPhone",
    ];

    const { id: productId } = useParams();
  
    useEffect(() => {

      if(product && product._id !== productId){
        dispatch(getProductDetails(productId))
      }
      else {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setStock(product.stock);
        setOldImages(product.images)
      }
      if(error){
        ToastCallError(error);
        dispatch(clearErrors());
      } 
      if(updateError){
        ToastCallError(updateError);
        dispatch(clearErrors());
      }
      
      if(isUpdated){
        ToastCallSuccess("Product Updated Successfully");
        navigate("/admin/products")
        dispatch({type: UPDATE_PRODUCT_RESET});
      }
    }, [productId,product,dispatch,navigate,error,updateError,isUpdated])
    
  
    const updateProductSubmitHandler = (e)=>{
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("name",name)
      myForm.set("price",price)
      myForm.set("description",description)
      myForm.set("category",category)
      myForm.set("stock",stock)
  
      images.forEach((image)=>{
        myForm.append("images",image);
      });
      dispatch(updateProduct(productId,myForm));
    }
  
    const updateProductImagesChange = (e)=>{
      const files = Array.from(e.target.files);
      setImages([]);
      setImagesPreview([]);
      setOldImages([]);
      files.forEach((file)=>{
        const reader = new FileReader();
  
        reader.onload = ()=>{
          if(reader.readyState === 2){
            setImagesPreview((old)=>[...old,reader.result])
            setImages((old)=> [...old,reader.result])
          }
        }
  
        reader.readAsDataURL(file);
      })
    }
  
  
  










  return (
    <>  
      <MetaData title={`Update Product`} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form onSubmit={updateProductSubmitHandler} className="createProductForm" encType='multipart/form-data'>
            <h1>Create Product</h1>
            <div>
              <SpellcheckSharpIcon />
              <input type="text" placeholder='Product Name' required value={name} onChange = {(e)=> setName(e.target.value)} />
            </div>
            <div>
              <AttachMoneySharpIcon />
              <input type="number" placeholder='Price' required value={price} onChange = {(e)=> setPrice(e.target.value)} />
            </div>
            <div>
              <DescriptionSharpIcon />
              <textarea placeholder='Product Description' value={description} onChange = {(e)=> setDescription(e.target.value)} cols="30" rows = "1" ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e)=>setCategory(e.target.value)} >
                <option value="">{category}</option>
                {categories.map((cate)=>(
                  <option key={cate} value={cate}>{cate}</option>
                ))}
              </select>
            </div>

            <div>
              <SdStorageSharpIcon />
              <input type="number" placeholder='stock' value={stock} required onChange={(e)=>setStock(e.target.value)} />
            </div>

            <div id="createProductFormFile">
              <input type="file" name='avatar' accept='image/*' onChange={updateProductImagesChange} multiple />
            </div>

            <div id="createProductFormImage">
              {oldImages.map((image,index)=> (
                <img src={image.url} alt="Old Product Preview" key={index} />
              ))}
            </div>
            <div id="createProductFormImage">
              {imagesPreview.map((image,index)=> (
                <img src={image} alt="Product Preview" key={index} />
              ))}
            </div>

            <Button id='createProductBtn' type='submit' disabled= {loading ? true: false}>
                Update
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdateProduct