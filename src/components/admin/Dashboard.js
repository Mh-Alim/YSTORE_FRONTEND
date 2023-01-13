import React, { useEffect } from 'react'
import SideBar from "./SiderBar"
import ALogo from "../../imgs/name_logo.png"
import { Link } from 'react-router-dom'
import "./Dashboard.css"
import { TreeView } from '@mui/lab';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Typography } from '@mui/material';
import {Doughnut,Line} from "react-chartjs-2"
import { Chart as ChartJs, LineElement, CategoryScale,LinearScale,PointElement,Legend,Tooltip, ArcElement } from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { ToastCallError } from '../../ReactToast'
import { clearErrors, getAdminProducts } from '../../actions/productActions'
import {getAllOrders} from "../../actions/orderAction"
ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  ArcElement
  
)








const Dashboard = () => {
  


  const dispatch = useDispatch();
  const {error,products} = useSelector(state => state.products) 
  const {orders} = useSelector(state => state.allOrders)
  let outOfStock = 0;
  console.log(products)
  products && products.forEach((item)=> {
    if(item.stock === 0){
      outOfStock++;
    }
  });
  console.log(outOfStock)
  const lineState = {
    labels : ["Initial Amount","Amount Earned"],
    datasets : [
      {
        label : "TOTAL AMOUNT",
        backgroundColor : ["tomato"],
        hoverBackgroundColor : ["black"],
        data : [0,400]
      }
    ]
  }

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets : [
      {
        label : ["Stocks"],
        backgroundColor : ["#00A684","#6800B4"],
        hoverBackgroundColor : ["#4B5000","#35014F"],
        data : [outOfStock,products.length-outOfStock]
      }
    ]
  }


  useEffect(() => {



   dispatch(getAdminProducts());
   dispatch(getAllOrders())
  }, [dispatch])
  





 
  return (
    <div className='dashboard'>
      <SideBar />
      <div className="dashboardContainer">
        <Typography component="h1" >Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>Total Amount <br /> 300 Rs</p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to = "/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data = {lineState}  />
        </div>
        <div className="doughnutChart">
          <Doughnut data = {doughnutState}  />
        </div>

      </div>
    </div>
  )
}

export default Dashboard