import React from 'react'
import ALogo from "../../imgs/name_logo.png"
import { Link } from 'react-router-dom'
import "./Sidebar.css"
import { TreeView,TreeItem } from '@mui/lab';
import ExpandIcon from '@mui/icons-material/ImportExport';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ImportExport from '@mui/icons-material/ImportExport';
import { IconButton } from '@mui/material';


const SiderBar = () => {
  return (
    <div className='sidebar'> 
      <Link to="/">
        <img src={ALogo} alt="STORE" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <div>
        <TreeView defaultCollapseIcon={<ExpandIcon/>} defaultExpandIcon={<ImportExport/>} >
          <TreeItem nodeId='1' label="Products" >
            <Link to="/admin/products">
              <TreeItem nodeId='2' label="All" icon= {<PostAddIcon />}  />
            </Link>
            <Link to="/admin/product/new">
              <TreeItem nodeId='3' label="Create" icon={<AddIcon/>} />
            </Link>
          </TreeItem>
        </TreeView>
      </div>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon />
          Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
    </div>
  )
}

export default SiderBar