import React, { useEffect,useState } from 'react'
import "./User.css"
import { Link,useNavigate } from 'react-router-dom';
import { register,clearErrors } from '../../actions/userActions';
import { useDispatch,useSelector } from 'react-redux';
import Loader from "../Layouts/Loader/Loader"

import { ToastCallError } from '../../ReactToast';





const Signup = () => {
    const navigate = useNavigate();
    const {loading,isAuthenticated,error} = useSelector((state)=> state.user);
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name : "",
        email : "",
        password : "",
        cpassword : ""
    });

    const {name,email,password,cpassword} = user;

    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPreview] = useState("/userImg.png")
    
    const registerSubmitHandler = async(e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("cpassword",cpassword);
        myForm.set("avatar",avatar);
        console.log(myForm);
        dispatch(register(myForm));
    }

    useEffect(() => {
      if(error){
        ToastCallError(error)
        dispatch(clearErrors());
      }
      if(isAuthenticated){
        navigate("/account");
      }
    }, [navigate,isAuthenticated,dispatch,error]);
    

    const registerDataChange = (e)=>{

        if(e.target.name === "avatar"){
            const reader = new FileReader();
            reader.onload = ()=>{
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        }

        else {
            setUser({...user,[e.target.name] : e.target.value});
        }
    }


  return (
    <>
   {loading ? <Loader/> : <div classname="signup">
        <div className='contact' id='contact'>
            <div className="contact_heading">Register</div>
            <div className="contact_content">
                <div className="contact_content_forms">
                    <form action="" method='POST' encType="multipart/form-data" className='input-icons' onSubmit={registerSubmitHandler}>
                        <div className='input_element'>
                            <i className="fa fa-user icon"></i>
                            <input onChange={registerDataChange} type="text" name='name' id='name'  placeholder='Your name'/>
                        </div>
                        <div className='input_element'>
                            <i className="fa fa-envelope icon"></i>
                            <input onChange={registerDataChange} type="email" name='email' id='email' placeholder='Email'/>
                        </div>
                        <div className='input_element'>
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            <input onChange={registerDataChange} type="password" name='password'  id='password' placeholder='Password'/>
                        </div>
                        <div className='input_element'>
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            <input onChange={registerDataChange} type="password" name='cpassword'  id='cpassword' placeholder='Confirm Password'/>
                        </div>
                        <div className='input_element'>
                            <img src={avatarPreview} alt="" />
                            <input onChange={registerDataChange} type="file" id="avatar" accept='image/*'  name="avatar" />
                        </div>
                        
                        <button type='submit' className='contact_btn input_element'>Register</button>
                    </form>
                    <p>If you have already registered then <Link to="/login" style={{color:"var(--green)",textDecoration:"none",margin:"0 0.5rem"}}>Login</Link> here </p>
                </div>
            </div>
            </div>
    </div> }
     </>
  )
}

export default Signup