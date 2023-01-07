import React, { useEffect, useRef } from 'react'
import "./User.css"
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Layouts/Loader/Loader';
import { changePasswordAction, clearErrors } from '../../actions/userActions';
import { ToastCallError, ToastCallSuccess } from '../../ReactToast';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/Header/MetaData';

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let oldPass = useRef(null);
  let newPass = useRef(null);
  let confPass = useRef(null);

  const {loading,error,isUpdated} = useSelector(state=>state.profile);


  const updatePasswordHandler = (e)=>{
    e.preventDefault();
    oldPass = oldPass.current.value;
    newPass = newPass.current.value;
    confPass = confPass.current.value;

    dispatch(changePasswordAction(oldPass,newPass,confPass));
  }
  useEffect(() => {
    if(error){
      ToastCallError(error);
      dispatch(clearErrors());
    }
    if(isUpdated){
      navigate("/account")
      ToastCallSuccess("Password Changed Successfully");
      dispatch({type: UPDATE_PASSWORD_RESET});
    }
  }, [error,isUpdated,dispatch,navigate])
  
  return (
    <>
        {loading ? <Loader/> : <div classname="signin">
        
        <MetaData title="Change Password"/>
        <div className='contact' id='contact'>
            <div  className="changePassword contact_heading_login">Change Password</div>
            <div className="contact_content">
                <div className="contact_content_forms">
                    <form action="" method='POST' className='input-icons' onSubmit={updatePasswordHandler}>
                        
                        <div className='input_element'>
                            <i className="fa fa-key" aria-hidden="true"></i>
                            <input ref={oldPass} type="text" name='password' id='password' placeholder='Old Password'/>
                        </div>
                        <div className='input_element'>
                            <i className="fa fa-key" aria-hidden="true"></i>
                            <input ref={newPass} type="text" name='password' id='password' placeholder='New Password'/>
                        </div>
                        <div className='input_element'>
                            <i className="fa fa-key" aria-hidden="true"></i>
                            <input ref={confPass} type="text" name='password' id='password' placeholder='Confirm Password'/>
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

export default ChangePassword