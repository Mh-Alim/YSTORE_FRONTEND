import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./User.css"
import Loader from '../Layouts/Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { ToastCallError, ToastCallSuccess } from '../../ReactToast'
import {clearErrors, loadUser, resetProfile, updateProfile} from "../../actions/userActions"

const UpdateProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading,user,error,isUpdated} = useSelector(state=>state.profile);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview,setAvatarPreview] = useState("/userImg.png");

    useEffect(() => {
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url)
        }
        if(error){
            ToastCallError(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            ToastCallSuccess("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch(resetProfile());
            
        }
        

    }, [dispatch,error,isUpdated,navigate,user])
    

    const registerSubmitHandler = (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name",name);
 
        myForm.set("email",email);
        myForm.set("avatar",avatar);
        
        dispatch(updateProfile(myForm));
    }
    const registerDataChange = (e)=>{
        
        const reader = new FileReader();
        reader.onload = ()=>{
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }

        reader.readAsDataURL(e.target.files[0]);
    }
  return (
    <>  
        {loading ? <Loader/> : <div classname="signup">
        <div className='contact' id='contact'>
            <div className="contact_heading">Update Profile</div>
            <div className="contact_content">
                <div className="contact_content_forms">
                    <form action="" method='POST' encType="multipart/form-data" className='input-icons' onSubmit={registerSubmitHandler}>
                        <div className='input_element'>
                            <i className="fa fa-user icon"></i>
                            <input onChange={(e)=>setName(e.target.value)} type="text" name='name' id='name' value={name}  placeholder='Your name'/>
                        </div>
                        <div className='input_element'>
                            <i className="fa fa-envelope icon"></i>
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" name='email' id='email' placeholder='Email'/>
                        </div>
                        
                        <div className='input_element'>
                            <img src={avatarPreview} alt="" />
                            <input onChange={registerDataChange} type="file" id="avatar" accept='image/*'  name="avatar" />
                        </div>
                        
                        <button type='submit' className='contact_btn input_element'>Update</button>
                    </form>
                </div>
            </div>
            </div>
    </div> }
    </>
  )
}

export default UpdateProfile