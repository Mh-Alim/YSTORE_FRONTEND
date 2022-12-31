import './App.css';
import { Route,Routes } from "react-router-dom"
import Header from './components/Layouts/Header/Header';
import Footer from './components/Layouts/Footer/Footer';
import Home from './components/Home/Home';
import FeaturedProducts from './components/FeaturedProducts/FeaturedProducts';
import MetaData from './components/Layouts/Header/MetaData';
// import Loader from './components/Layouts/Loader/Loader';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';


function App() {
  return (
    <div className='app'>

      <MetaData title="YSTORE" />
      <Header />
      <Routes >
        <Route exact path='/' element = {<><Home /><FeaturedProducts /></>} /> 
        <Route exact path='/product/:id' element = {<ProductDetails />} /> 
        <Route exact path='/products' element = {<Products/>} /> 
        <Route exact path='/products/:keyword' element = {<Products/>} /> 
      </Routes>
      
      <Footer />
      
      
      
    
      {/* <Routes >
        <Route exact path='/Home' element = {<Header />} /> 
      </Routes> */}
    </div>
  );
}

export default App;
