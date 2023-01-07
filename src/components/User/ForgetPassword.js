import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgetPasswordAction } from '../../actions/userActions';
import { ToastCallError, ToastCallSuccess } from '../../ReactToast';
import MetaData from '../Layouts/Header/MetaData';
import Loader from '../Layouts/Loader/Loader';
import "./User.css"


const ForgetPassword = () => {



    const {loading,error,message} = useSelector(state=>state.forgetPassword);
    const dispatch = useDispatch();

    let email = useRef(null);

    const forgetPasswordHandler = (e)=>{
        e.preventDefault();
        email = email.current.value;
        console.log(email)
        dispatch(forgetPasswordAction(email));
    }

    useEffect(() => {
        if(error){
            ToastCallError(error);
            dispatch(clearErrors());
        }
        if(message){
            ToastCallSuccess(message);

        }
    }, [error,dispatch,message])
    
  return (
      <>
        {loading ? <Loader/> : <div classname="signin">
      <MetaData title="Forget Password"/>
        <div className='contact' id='contact'>
            <div  className="changePassword contact_heading_login">Forget Password</div>
            <div className="contact_content">
                <div className="contact_content_forms">
                    <form action="" method='POST' className='input-icons' onSubmit={forgetPasswordHandler}>
                        
                        <div className='input_element'>
                            <i className="fa fa-envelope icon"></i>
                            <input ref={email} type="email" name='email' id='email' placeholder='Email'/>
                        </div>
                        
                        <button style={{margin:"2rem auto"}} type='submit' className='contact_btn input_element'>Send</button>
                    </form>
                </div>
            </div>
            </div>
    </div> }

    </>
  )
}

export default ForgetPassword