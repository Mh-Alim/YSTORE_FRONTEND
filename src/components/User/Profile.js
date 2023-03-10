import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/Header/MetaData'
import Loader from "../Layouts/Loader/Loader"
import "./Profile.css"


const Profile = () => {
    const navigate = useNavigate();
    const {user,loading,isAuthenticated } = useSelector(state => state.user);

    useEffect(() => {
        if(isAuthenticated === false) {
            navigate("/login");
        }
    }, [isAuthenticated,navigate])

  return (
    <>
    {loading ? <Loader /> :  <div>
        <MetaData title={`${user.name}'s Profile`} />

        <div className="profileContainer">
            <div class ="profileContainer-1" >
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt={user.name} />
                <Link to="/me/update"> Edit Profile </Link>
            </div>
            <div className="profileContainer-2">
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substring(0,10)}</p>
                </div>
                <div>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/password/update">Change Password</Link>
                </div>
            </div>
        </div>

    </div>
    }
    
    </>
  )
}

export default Profile