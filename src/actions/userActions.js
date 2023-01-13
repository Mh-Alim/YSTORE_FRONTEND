import axios from "axios";
import { DELETE_ORDER_SUCCESS } from "../constants/orderConstants";
import { LOGIN_FAIL,LOGIN_REQUEST,LOGIN_SUCCESS,CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_RESET, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, DELETE_USER_FAIL, DELETE_USER_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL, DELETE_USER_SUCCESS } from "../constants/userConstants";
import { ToastCallSuccess } from "../ReactToast";



// LOGOIN
export const login =  (email,password) => async(dispatch)=>{

    try {
        dispatch({type: LOGIN_REQUEST})
        const config = {
            headers : {
                "Content-Type" : "application/json",
            }
        }
    
        const {data} = await axios.post("/api/v1/login",{email,password},config);
        console.log("login action data : ",data);
    
        dispatch({type: LOGIN_SUCCESS,payload : data.info});
    }
    catch(error){
        dispatch({type: LOGIN_FAIL, payload: error.response.data.message})
    }
    
} 



// REGISTER
export const register =  (userData) => async(dispatch)=>{

    try {
        dispatch({type: REGISTER_REQUEST})
        const config = {
            headers : {
                "Content-Type" : "multipart/form-data",
            }
        }
   
        const {data} = await axios.post("/api/v1/register",userData,config);
        
        dispatch({type: REGISTER_SUCCESS,payload : data.info});
    }
    catch(error){
        dispatch({type: REGISTER_FAIL, payload: error.response.data.message})
    }
    
}   

// LOAD USER
export const loadUser =  () => async(dispatch)=>{

    try {
        dispatch({type: LOAD_USER_REQUEST})

   
        const {data} = await axios.get("/api/v1/me");
        console.log("register data : ",data);
    
        dispatch({type: LOAD_USER_SUCCESS,payload : data.user});
    }
    catch(error){
        dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message})
    }
    
}   


// LOGOUT USER 

export const logout = () => async(dispatch)=>{
    try {
        console.log("here logout first point")
        const {data} = await axios.get("/api/v1/logout");
        console.log(data)

        ToastCallSuccess("Logout Successfully");
        dispatch({type : LOGOUT_USER_SUCCESS})
    }
    catch(error){
        dispatch({type : LOGOUT_USER_FAIL, type: error.response.data.message})
    }
}

// UPDATE PROFILE 


export const updateProfile = (userData)=> async(dispatch)=>{
    try{    
        dispatch({type : UPDATE_PROFILE_REQUEST});
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const {data} = await axios.put("/api/v1/me/update",userData,config);

        dispatch({type:UPDATE_PROFILE_SUCCESS,payload : data.success});
    }
    catch(error){
        dispatch({type : UPDATE_PROFILE_FAIL,payload : error.response.data.message});
    }
}

export const changePasswordAction = (oldPass,newPass,confirmPass) => async(dispatch)=>{
    try{
        dispatch({type: UPDATE_PASSWORD_REQUEST});

        const config = {
            headers: {
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.put("/api/v1/password/update",{oldPass,newPass,confirmPass},config);
        console.log(data)
        dispatch({type: UPDATE_PASSWORD_SUCCESS,payload : data.success})
    }
    catch(error){
        dispatch({type: UPDATE_PASSWORD_FAIL,payload : error.response.data.message});
    }
}


export const forgetPasswordAction = (email)=> async(dispatch)=>{
    try{
        dispatch({type: FORGET_PASSWORD_REQUEST});

        const config = {
            headers: { 
                "Content-Type":"application/json"
            }
        }
        const {data} = await axios.post(`/api/v1/password/forgot`,{email},config);
        dispatch({type : FORGET_PASSWORD_SUCCESS,payload:data.message})
    }catch(error){
        console.log("ERROR IN ACTION ",error);
        dispatch({type: FORGET_PASSWORD_FAIL,payload: error.response.data.message})
    }
}
export const resetProfile = ()=> (dispatch)=>{
    dispatch({type : UPDATE_PROFILE_RESET})
}






// AFTER CLICKING ON LINK SENDED IN EMAIL USER WILL COME ON THIS   
export const resetPasswordAction = (token,password,cpassword)=> async(dispatch)=>{
    try{
        dispatch({type : RESET_PASSWORD_REQUEST});

        const config = {
            headers : {
                "Content-Type":"application/json"
            }
        }
        console.log("here reset pass",token,password,cpassword)
        const {data} = await axios.put(`/api/v1/password/reset/${token}`,{password,confirmPassword : cpassword},config);
        console.log(data)
        dispatch({type : RESET_PASSWORD_SUCCESS, payload : data.success})
    }
    catch(error){
        dispatch({type : RESET_PASSWORD_FAIL, payload : error.response.data.message});
    }
}



// ALL USERS
 
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axios.get(`/api/v1/admin/users`);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };


// GET USER DETAILS     
export const getUserDetails = (id) => async(dispatch)=>{

    try{    

        dispatch({type : USER_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({type : USER_DETAILS_SUCCESS, payload : data.user})

    }
    catch(error){
        dispatch({type : USER_DETAILS_FAIL, payload : error.response.data.message});
    }

}


// Update User
export const updateUser = (id, userData) => async (dispatch) => {
     try {  

        dispatch({type : UPDATE_USER_REQUEST});
        const config = {
            headers : {
                "Content-Type":"application/json",
            }
        }

        const {data} = await axios.put(`/api/v1/admin/user/${id}`,userData,config);

        dispatch({type : UPDATE_USER_SUCCESS, payload : data.success});

     }catch(error){
        dispatch({type : CLEAR_ERRORS, payload : error.response.data.message});
     }
  };
  

// Delete User 
export const delteUser = (id)=> async(dispatch) =>{
    try{

        dispatch({type : DELETE_USER_REQUEST});

        const {data} = await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({type : DELETE_USER_SUCCESS,payload: data})


    }
    catch(error){
        dispatch({type : DELETE_USER_FAIL, payload : error.response.data.message});
    }
}


// CLEAR ERRORS
export const clearErrors = ()=>{
    
    return (dispatch)=>{
        dispatch({
            type : CLEAR_ERRORS
        })
    }

    
}