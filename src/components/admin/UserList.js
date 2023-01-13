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
import { delteUser,getAllUsers } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstants';


const UserList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {error, users} = useSelector(state => state.allUsers);
  const {error : deleteError , isDeleted,success} = useSelector(state => state.profile)


  useEffect(()=>{
    if(error){
      ToastCallError(error);
      dispatch(clearErrors());
    }
    if(isDeleted){
      ToastCallSuccess("User Deleted Successfully");
      navigate("/admin/users")
      dispatch({type : DELETE_USER_RESET})
    }
    if(deleteError){
      ToastCallError(deleteError);
      dispatch(clearErrors());
    }

    dispatch(getAllUsers());
  },[error,dispatch,deleteError,isDeleted]);


  const deleteUserHandler = (id)=>{
    dispatch(delteUser(id))
  }


  const columns = [
    { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  users && users.forEach((item) => {
    rows.push({
      id: item._id,
      role: item.role,
      email: item.email,
      name: item.name,
    });
  });


  return (
    <>
     <MetaData title = "ALL USERS -- ADMIN" />
     <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>
          <DataGrid rows= {rows} columns = {columns} pageSize={10} disableSelectionOnClick className='productListTable' autoHeight />
        </div>
     </div>
    </>
  )
}

export default UserList