import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../Layouts/Loader/Loader';


const ProtectedRoutes = () => {

    const {loading,isAuthenticated} = useSelector(state=>state.user);
    return<> {loading === false ? isAuthenticated === true ? (<Outlet/>) : <Navigate to="/login" /> : <Loader/> }</>
}

export default ProtectedRoutes