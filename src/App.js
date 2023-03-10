import { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route,Routes } from "react-router-dom"
import Header from './components/Layouts/Header/Header';
import Footer from './components/Layouts/Footer/Footer';
import Home from './components/Home/Home';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import MetaData from './components/Layouts/Header/MetaData';
// import Loader from './components/Layouts/Loader/Loader';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import store from "./store";
import {  loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import UserOptions from './components/Layouts/Header/UserOptions';
import { ToastContainerError, ToastContainerSuccess } from './ReactToast';
import Profile from './components/User/Profile';
import ProtectedRoutes from './components/Route/ProtectedRoutes';
import UpdateProfile from './components/User/UpdateProfile';
import ChangePassword from './components/User/ChangePassword';
import ForgetPassword from './components/User/ForgetPassword';
// import { CLEAR_ERRORS } from './constants/userConstants';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';

import axios from "axios"
import OuterPayment from './components/Cart/OuterPayment';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import ProtectedAdminRoutes from './components/Route/ProtectedAdminRoutes';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import UserList from "./components/admin/UserList"
import UpdateUser from './components/admin/UpdateUser';
import ProductReviews from './components/admin/ProductReviews';








function App() {

  const {user,isAuthenticated,error} = useSelector(state => state.user);


  useEffect(() => {
    store.dispatch(loadUser());

  }, [])
  

    









  return (
    <div className='app'>

      <MetaData title="YSTORE" />
      <Header />
      {isAuthenticated ? <UserOptions user = {user}  /> : null}
      <Routes >
        <Route exact path='/' element = {<><Home /><FeaturedProducts /></>} /> 
        <Route exact path='/product/:id' element = {<ProductDetails />} /> 
        <Route exact path='/products' element = {<Products/>} /> 
        <Route exact path='/products/:keyword' element = {<Products/>} /> 
        <Route exact path='/signup' element = {<Signup/>} /> 
        <Route exact path='/login' element = {<Login/>} /> 

        <Route element={<ProtectedRoutes/>}>
          <Route exact path='/account' element={<Profile/>} />
          <Route exact path='/me/update' element={<UpdateProfile/>} />
          <Route exact path='/password/update' element={<ChangePassword/>} />
          <Route exact path='/shipping' element={<Shipping />} />
          <Route exact path='/order/confirm' element={<ConfirmOrder />} />
          <Route exact path='/process/payment' element={<OuterPayment />} />
          <Route exact path='/success' element={<OrderSuccess />} />
          <Route exact path='/orders' element={<MyOrders />} />
          <Route exact path='/order/:id' element={<OrderDetails />} />

          
       
        </Route>


          // admin Routes
        <Route element={<ProtectedAdminRoutes/>}>
         <Route exact path='/admin/dashboard' element={<Dashboard />} /> 
         <Route exact path='/admin/products' element={<ProductList/>} /> 
         <Route exact path='/admin/product/new' element={<NewProduct/>} /> 
         <Route exact path='/admin/product/:id' element={<UpdateProduct/>} /> 
         <Route exact path='/admin/orders' element={<OrderList/>} /> 
         <Route exact path='/admin/order/:id' element={<ProcessOrder/>} /> 
         <Route exact path='/admin/users' element={<UserList/>} /> 
         <Route exact path='/admin/user/:id' element={<UpdateUser/>} /> 
         <Route exact path='/admin/reviews' element={<ProductReviews/>} /> 
          
        </Route>


        <Route exact path='/forgetPassword' element={<ForgetPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/cart' element={<Cart />} />
      </Routes>
      
      <Footer />
      
      
      
    
      {/* <Routes >
        <Route exact path='/Home' element = {<Header />} /> 
      </Routes> */}

      {ToastContainerSuccess}
      {ToastContainerError}
    </div>
  );
}

export default App;
