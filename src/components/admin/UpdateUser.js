import React,{useEffect,useState} from 'react'
import "./NewProduct.css"
import {useSelector,useDispatch} from "react-redux"
import {ToastCallError,ToastCallSuccess} from "../../ReactToast"
import { Button } from '@mui/material'
import MetaData from "../Layouts/Header/MetaData"

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import Sidebar from "./SiderBar"
import { useNavigate, useParams } from 'react-router-dom'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { updateUser,getUserDetails, clearErrors } from '../../actions/userActions'
import Loader from '../Layouts/Loader/Loader'



const UpdateUser = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {loading:updateLoading, isUpdated, error : updateError} = useSelector(state => state.profile);
  const {loading,error, user} = useSelector(state => state.userDetails);
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")

  const {id} = useParams();
  useEffect(() => {

    if(user && user._id !== id){
        console.log(user)
        dispatch(getUserDetails(id));
    }
    else {
        setName(user.name)
        setEmail(user.email)
        setRole(user.role)
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
        ToastCallSuccess("User updated successfully");
        navigate("/admin/users")
        dispatch({type : UPDATE_USER_RESET});
    }
    
  }, [dispatch,navigate,error,isUpdated,id,updateError,user]);
  

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(id, myForm));
  };

  return (
    <>
    <MetaData title="Update User" />
    <div className="dashboard">
      <Sidebar />
      <div className="newProductContainer">
        {loading ? (
          <Loader />
        ) : (
          <form
            className="createProductForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>

            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <VerifiedUserIcon />
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Choose Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                updateLoading ? true : false || role === "" ? true : false
              }
            >
              Update
            </Button>
          </form>
        )}
      </div>
    </div>
  </>
  )
}

export default UpdateUser