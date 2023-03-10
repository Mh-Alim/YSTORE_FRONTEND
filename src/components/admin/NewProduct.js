import React,{useEffect,useState} from 'react'
import "./NewProduct.css"
import {useSelector,useDispatch} from "react-redux"
import {clearErrors,createProduct} from "../../actions/productActions"
import {ToastCallError,ToastCallSuccess} from "../../ReactToast"
import { Button } from '@mui/material'
import MetaData from "../Layouts/Header/MetaData"
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import SdStorageSharpIcon from '@mui/icons-material/SdStorageSharp';
import SpellcheckSharpIcon from '@mui/icons-material/SpellcheckSharp';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import Sidebar from "./SiderBar"
import { useNavigate } from 'react-router-dom'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'



const NewProduct = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,error,success} = useSelector(state => state.newProduct);
  
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhone",
  ]

  useEffect(() => {
    if(error){
      ToastCallError(error);
      dispatch(clearErrors());
    }

    if(success){
      ToastCallSuccess("Product Created Successfully");
      navigate("/admin/dashboard")
      dispatch({type: NEW_PRODUCT_RESET});
    }
  }, [dispatch,navigate,success,error])
  

  const createProductSubmitHandler = (e)=>{
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name",name)
    myForm.set("price",price)
    myForm.set("description",description)
    myForm.set("category",categories)
    myForm.set("stock",stock)

    images.forEach((image)=>{
      myForm.append("images",image);
    });
    dispatch(createProduct(myForm));
  }

  const createProductImagesChange = (e)=>{
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
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
      <MetaData title={`Create Product`} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form onSubmit={createProductSubmitHandler} className="createProductForm" encType='multipart/form-data'>
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
                <option value="">Choose Category</option>
                {categories.map((cate)=>(
                  <option key={cate} value={cate}>{cate}</option>
                ))}
              </select>
            </div>

            <div>
              <SdStorageSharpIcon />
              <input type="number" placeholder='stock' required onChange={(e)=>setStock(e.target.value)} />
            </div>

            <div id="createProductFormFile">
              <input type="file" name='avatar' accept='image/*' onChange={createProductImagesChange} multiple />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image,index)=> (
                <img src={image} alt="Product Preview" key={index} />
              ))}
            </div>

            <Button id='createProductBtn' type='submit' disabled= {loading ? true: false}>
                Create
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewProduct