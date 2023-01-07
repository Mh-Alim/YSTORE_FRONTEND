import { useEffect } from 'react';
import './App.css';
import { Route,Routes } from "react-router-dom"
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
import { clearErrors, loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import UserOptions from './components/Layouts/Header/UserOptions';
import { ToastContainerError, ToastContainerSuccess } from './ReactToast';
import Profile from './components/User/Profile';
import ProtectedRoutes from './components/Route/ProtectedRoutes';
import UpdateProfile from './components/User/UpdateProfile';
import ChangePassword from './components/User/ChangePassword';
import ForgetPassword from './components/User/ForgetPassword';
import { CLEAR_ERRORS } from './constants/userConstants';
import ResetPassword from './components/User/ResetPassword';
import Cart from './Cart/Cart';








function App() {


  const {user,isAuthenticated,error} = useSelector(state => state.user)

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
