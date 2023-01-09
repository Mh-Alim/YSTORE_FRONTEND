import React,{useState,useEffect} from 'react'
import "./MyOrders.css"
import { DataGrid } from '@mui/x-data-grid';
import {useSelector,useDispatch} from "react-redux"
import {clearErrors,myOrders} from "../../actions/orderAction"
import {Link} from "react-router-dom"
import {ToastCallError,ToastCallSuccess} from "../../ReactToast"
import MetaData from '../Layouts/Header/MetaData'
import { Typography } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import Loader from "../Layouts/Loader/Loader"







const MyOrders = () => {


    const dispatch = useDispatch();
    
    const {error,orders} = useSelector(state=>state.myOrders);
    const {user,loading} = useSelector(state=>state.user);

    const columns = [
        {field : "id",headerName : "Order ID",minWidth:300,flex: 1},
        {field : "status",headerName : "status",minWidth:150,flex: 0.5,cellClassName:(params)=>{
            return params.getValue(params.id,"status") === "Delivered" ? "greenColor":"redColor"
        }},
        {field : "itemsQty",headerName : "Items Qty",type : "number",minWidth:150,flex : 0.3},
        {field : "amount",headerName : "Amount",type : "number",minWidth:270,flex : 0.5},
        {field : "actions",headerName : "Actions",type : "number",minWidth:150,flex : 0.3,sortable : false,
        renderCell:(params)=>{
            return <Link to = {`/order/${params.getValue(params.id,"id")}`} >
                <LaunchIcon />
            </Link>
        }}
    ];
    const rows = [];

    orders && orders.forEach((item,index)=>{
        rows.push({
            itemsQty : item.orderItems.length,
            id : item._id,
            status : item.orderStatus,
            amount : item.totalPrice
        })
    })

    useEffect(() => {
        if(error){
            ToastCallError(error);
            // dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [error,dispatch])
    






  return (<>{loading ? <Loader /> : ( <><MetaData title={`${user.name} - Orders`} />

       
            <div className="myOrdersPage">
                <DataGrid rows = {rows} columns= {columns} pageSize = {10} disableSelectionOnClick className='myOrdersTable' autoHeight/>

                <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
            </div>
            </>
        )}
    </>
  )
}

export default MyOrders