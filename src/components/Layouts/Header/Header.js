import React, { useEffect,useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

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


  return (
    <div id="header">
    <Navbar id='navbar' expand="lg">
      <Container fluid>
        <Navbar.Brand className='web_name' href="#">YSTORE</Navbar.Brand>
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
            <Nav.Link className='navUrl' href="/login">Login</Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex" onSubmit={searchBarHandler} >
            <Form.Control
              type="search"
              placeholder="Search Product"
              className="me-2"
              aria-label="Search"
              ref={keywordRef}
            />
            <Button type='submit'  variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header