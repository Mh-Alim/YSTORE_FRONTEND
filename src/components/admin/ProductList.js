import React, { useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom"
import "./ProductList.css"
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import {useSelector,useDispatch} from "react-redux"
import {deleteProduct,clearErrors,getAdminProducts} from "../../actions/productActions"
import {ToastCallError, ToastCallSuccess} from "../../ReactToast"
import { Button } from '@mui/material';
import MetaData from "../Layouts/Header/MetaData"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from "./SiderBar"
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';


const ProductList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error, products} = useSelector(state => state.products);
  const {error : deleteError , isDeleted,success} = useSelector(state => state.product)


  useEffect(()=>{
    if(error){
      ToastCallError(error);
      dispatch(clearErrors());
    }
    if(isDeleted){
      ToastCallSuccess("Producted Deleted Successfully");
      navigate("/admin/dashboard")
      dispatch({type : DELETE_PRODUCT_RESET})
    }
    if(deleteError){
      ToastCallError(deleteError);
      dispatch(clearErrors());
    }
  },[error,dispatch,deleteError,isDeleted]);


  const deleteProductHandler = (id)=>{
    dispatch(deleteProduct(id))
  }

  const columns = [
    {field : "id", headerName : "Product ID", minWidth : 200, flex: 0.5},
    {field : "name", headerName : "Name", minWidth : 350, flex : 1},
    {field : "stock", headerName : "Stock", type : "number",minWidth : 150, flex : 0.3},
    {field : "price", headerName : "Price", price : "number" ,minWidth : 270, flex : 0.5},
    {
      field : "actions",flex : 0.3 , headerName : "Actions",minWidth : 150, type : "number",sortable : false, renderCell : (params) => {
        return (
          <>
            <Link to = {`/admin/product/${params.getValue(params.id, "id")}`} >
              <EditIcon /> 
            </Link>
            <Button onClick={()=> deleteProductHandler(params.getValue(params.id,"id"))}>
              <DeleteIcon />
            </Button>
          </>
        )
      }
    }
    
  ];
  const rows = [];
  products && products.forEach((item)=>{
    rows.push({
      id: item._id,
      stock : item.stock,
      price : item.price, 
      name : item.name
    })
  });



  useEffect(() => {
    if(error){
      ToastCallError(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminProducts());
  }, [error,dispatch]);
  










  return (
    <>
     <MetaData title = "ALL PRODUCTS -- ADMIN" />
     <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid rows= {rows} columns = {columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight />
        </div>
     </div>
    </>
  )
}

export default ProductList