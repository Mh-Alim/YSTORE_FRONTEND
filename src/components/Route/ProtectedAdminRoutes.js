import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../Layouts/Loader/Loader';


const ProtectedAdminRoutes = () => {
    const {loading,isAuthenticated,user} = useSelector(state=>state.user);
    return<> {loading === false ? isAuthenticated === true && user.role === "admin" ? (<Outlet/>) : <Navigate to="/account" /> : <Loader/>}</>
}

export default ProtectedAdminRoutes