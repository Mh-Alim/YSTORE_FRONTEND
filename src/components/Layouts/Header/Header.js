import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import nameLogo from "../../../imgs/name_logo.png"
import LoginLogo from "../../../imgs/login_logo.png"

// import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"


const Header = () => {
  const keywordRef = useRef();
  const navigate = useNavigate();
  
  const searchBarHandler = (e) => {
    e.preventDefault();
    let keyword = keywordRef.current.value;
    console.log(keyword);
    if(keyword.trim()){
      navigate(`/products/${keyword}`)
    }
    else navigate("/products");
  }



  const toggleActiveClass = () => {

    console.log("clicked");
    var hamburger = document.querySelector(".hamburger");
    var navbar = document.querySelector(".nav_elements");

    // On click
    hamburger.classList.toggle("is-active");
    navbar.classList.toggle("showNavList")
  }
  
  return (

    
    <div className='navbar' id='navbar'>
        <div className="logo"><img src={nameLogo} alt="" /></div>
        <div className='nav_elements'>
            <p onClick={toggleActiveClass} className='nav_element' id='about'><Link  style={{ textDecoration: 'none',color : 'var(--slate)' }} to='/'> <span className='green'>01.</span><span className='nav_elem_text'>Home</span>  </Link></p>
            <p onClick={toggleActiveClass} className='nav_element'><Link   style={{ textDecoration: 'none',color : 'var(--slate)' }} to='/products'> <span className='green'>02.</span><span className='nav_elem_text'>Products</span> </Link></p>
            <p onClick={toggleActiveClass} className='nav_element'><Link  style={{ textDecoration: 'none',color : 'var(--slate)' }} to='/profile'> <span className='green'>03.</span><span className='nav_elem_text'>Profile</span></Link></p>
            <p onClick={toggleActiveClass} className='nav_element'><Link  style={{ textDecoration: 'none',color : 'var(--slate)' }} to='/login'> <span className='green'>03.</span><span className='nav_elem_text'>Login</span></Link></p>
            <div id="search">
            <Form className="d-flex" onSubmit={searchBarHandler} >
              <Form.Control
              style={{fontFamily:"var(--font-mono)"}}
                type="search"
                placeholder="Search Product"
                className="me-2"
                aria-label="Search"
                ref={keywordRef}
              />
              <Button id='searchBtn' type='submit'  variant="outline-success">Search</Button>
            </Form>
        </div>
            {/* <div onClick={toggleActiveClass}  ><a  href="https://drive.google.com/file/d/1aoJhmxa6B2KUTJfoLmvwFwfeFnGDQjUE/view?usp=sharing"  target="_blank" rel="noreferrer"  className='nav_resume' style={{ textDecoration: 'none' }} > Resume </a></div> */}
        </div>
        
        <button className="hamburger hamburger--spin" onClick={toggleActiveClass} type="button">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
    </div>
  )

  return (
    <div id="header">
    <Navbar id='navbar' expand="lg">
      <Container fluid>
        <Navbar.Brand className='web_name' href="#">
          <img src={nameLogo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle className='hamburger' aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100vh' }}
            navbarScroll
          >
            <Nav.Link className='navUrl' href="/">Home</Nav.Link>
            <Nav.Link className='navUrl' href="/products">Products</Nav.Link>
            <Nav.Link className='navUrl' href="/stores">Stores</Nav.Link>
            <Nav.Link className='navUrl' href="/about">About</Nav.Link>
            <Nav.Link className='navUrl' href="/contact">Contact</Nav.Link>
            <Nav.Link className='navUrl' href="/login">
              <img src={LoginLogo} alt="" />
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={searchBarHandler} >
            <Form.Control
            style={{fontFamily:"var(--font-mono)"}}
              type="search"
              placeholder="Search Product"
              className="me-2"
              aria-label="Search"
              ref={keywordRef}
            />
            <Button id='searchBtn' type='submit'  variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header