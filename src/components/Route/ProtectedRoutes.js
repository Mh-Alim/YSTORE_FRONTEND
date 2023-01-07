import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { loadUser } from '../../actions/userActions'
import store from '../../store'


const ProtectedRoutes = ({element,...rest}) => {

    const {loading,isAuthenticated,user} = useSelector(state=>state.user);

    return !loading &&  isAuthenticated ? (<Outlet/>): <Navigate to="/login" />
}

export default ProtectedRoutes