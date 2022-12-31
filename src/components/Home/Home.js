import React from 'react'
import scrollImg from "../../imgs/mouse-cursor.png"
import "./Home.css"


import {Link} from "react-router-dom"
const Home = () => {

  return (
    <div className='outer_home'>
      <div className='home'>
          <div className="home_heading">Welcome to YSTORE</div>
          <div className="home_text">Here, You will get amazing products of your city</div>
          <Link className='scrollBtn' to="#products"> <img src={scrollImg} alt="" />
          </Link>
      </div>
    </div>
  )
}

export default Home