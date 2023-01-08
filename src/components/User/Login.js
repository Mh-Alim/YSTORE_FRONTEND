import React, { useEffect, useRef } from 'react'
import {useSelector,useDispatch} from "react-redux"
import "./User.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login,clearErrors } from '../../actions/userActions';
import Loader from '../Layouts/Loader/Loader';
import { ToastCallError, ToastCallSuccess, ToastContainerError } from '../../ReactToast';






const Login = () => {


    const location = useLocation();
    console.log(location.search.split("=")[1])
    const redirect = location.search ? location.search.split("=")[1] : "account"
    const navigate = useNavigate();

    const {loading,isAuthenticated,error} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const email = useRef(null);
    const password = useRef(null);

    const LoginHandler = async(e) => {
        e.preventDefault();
        dispatch(login(email.current.value, password.current.value));
    }

    useEffect(() => {
      if(error){
        ToastCallError(error)
        dispatch(clearErrors());
      }

      if(isAuthenticated){
        navigate(`/${redirect}`);
        if(redirect !== "shipping") ToastCallSuccess("Login Successfully")
      }
    }, [error,dispatch,navigate,isAuthenticated,redirect])
    
  return (
    <>
    {loading ? <Loader/> : <div classname="signin">
    <div className='contact' id='contact'>
        <div  className="contact_heading_login">Login</div>
        <div className="contact_content">
            <div className="contact_content_forms">
                <form action="" method='POST' className='input-icons' onSubmit={LoginHandler}>
            
                    <div className='input_element'>
                        <i className="fa fa-envelope icon"></i>
                        <input ref={email} type="email" name='email' id='email' placeholder='Email'/>
                    </div>
                    
                    <div className='input_element'>
                        <i className="fa fa-key" aria-hidden="true"></i>
                        <input ref={password} type="text" name='password' id='password' placeholder='Password'/>
                    </div>
                    <p className='forgetPasswordText'><Link to="/forgetPassword" style={{color:"var(--green)",textDecoration:"none",margin:"0 0.5rem"}}> Forget Password </Link></p>
                    <button style={{margin:"2rem auto"}} type='submit' className='contact_btn input_element'>Login</button>
                </form>
                <p>If you have not registered then <Link to="/signup" style={{color:"var(--green)",textDecoration:"none",margin:"0 0.5rem"}}> Register </Link> here </p>
            </div>
        </div>
        </div>
</div> }

    </>
  )
}

export default Login