import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./User.css"
import MetaData from '../Layouts/Header/MetaData'
import Loader from '../Layouts/Loader/Loader'
import { ToastCallError, ToastCallSuccess } from '../../ReactToast'
import { resetPasswordAction } from '../../actions/userActions'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { clearErrors } from '../../actions/productActions'

const ResetPassword = () => {

    const navigate = useNavigate();
    const {token} = useParams();
    let password = useRef(null);
    let cpassword = useRef(null);
    const {loading,error,success} = useSelector(state=>state.forgetPassword);
    const dispatch = useDispatch();


    const resetPasswordHandler = (e)=>{
        e.preventDefault();
        password = password.current.value;
        cpassword = cpassword.current.value;
        dispatch(resetPasswordAction(token,password,cpassword));
    }

    useEffect(() => {
        console.log("Rendering ")
        if(error){
            ToastCallError(error);
            dispatch(clearErrors());
        }
        if(success){
            ToastCallSuccess("Password reset Successfully");
            navigate("/login")
        }
    }, [error,dispatch,success,navigate])
    





  return (
    <>
    {loading ? <Loader/> : <div classname="signin">\
    <MetaData title="Reset Password" />
    <div className='contact' id='contact'>
        <div  className="changePassword contact_heading_login"> Reset Password </div>
        <div className="contact_content">
            <div className="contact_content_forms">
                <form action="" method='POST' className='input-icons' onSubmit={resetPasswordHandler}>
                    <div className='input_element'>
                        <i className="fa fa-key" aria-hidden="true"></i>
                        <input ref={password} type="text" name='password' id='password' placeholder='Password'/>
                    </div>
                    <div className='input_element'>
                        <i className="fa fa-key" aria-hidden="true"></i>
                        <input ref={cpassword} type="text" name='password' id='password' placeholder='Confirm Password'/>
                    </div>
                    <button style={{margin:"2rem auto"}} type='submit' className='contact_btn input_element'>Submit</button>
                </form>
            </div>
        </div>
        </div>
</div> }

    </>
  )
}

export default ResetPassword