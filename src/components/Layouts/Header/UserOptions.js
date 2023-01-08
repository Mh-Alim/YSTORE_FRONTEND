import React, { useState } from 'react'
import "./Header.css"
import { SpeedDial,SpeedDialAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/userActions';


// icons import 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Backdrop from '@mui/material/Backdrop';
import { ToastCallSuccess, ToastContainerSuccess } from '../../../ReactToast';


const UserOptions = ({user}) => {
  const {cartItems} = useSelector(state => state.cart)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function orders(){
    navigate("/orders");
  }
  function dashboard(){
    navigate("/dashboard");
  }
  function account(){
    navigate("/profile");
  }
  function cart(){
    navigate("/cart");
  }
  function logoutUser(){

    dispatch(logout());
  
   
  }


  const options = [
    {icon : <ProductionQuantityLimitsIcon/>,name : "Orders",func: orders},
    {icon : <AccountBoxIcon/>,name : "Profile",func: account},
    {icon : <ShoppingCartIcon style={{color : cartItems.length === 0 ? "unset" : "tomato"}}/>,name : `Cart(${cartItems.length})`,func: cart},
    {icon : <LogoutIcon/>,name : "Logout",func: logoutUser},
    ]

  {user.Role === "Admin" && options.unshift({icon : <DashboardIcon/>,name : "Dashboard",func: dashboard},)}

  const [open, setOpen] = useState(false);
  return (
    <>
    <Backdrop open={open} style={{zIndex:100}}  />
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={()=>setOpen(false)}
            onOpen={()=>setOpen(true)}
            open = {open}
            direction = "down"
            className='speedDial'
            
            icon = {
                <img className='speedDialIcon' src={user.avatar.url ? user.avatar.url : "/userImg.png"} alt = "Profile" />
            }
        >

        {options.map((item)=> <SpeedDialAction tooltipOpen={window.innerWidth <= 600 ? true : false} key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />)}
        </SpeedDial>

        

            {ToastContainerSuccess}

    </>
  )
}

export default UserOptions