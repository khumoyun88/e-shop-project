// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import shortLogo from "../public/GG.png"
import './App.css'
import { BrowserRouter as Router , Routes , Route ,NavLink} from "react-router-dom"
import Home from "./components/home/Home"
import Products from "./components/products/Products"
import Product from "./components/product/Product"
import { useState } from "react"
import Cart from "./components/cart/Cart";



import { FaCartShopping, FaIdBadge, FaPerson, FaPhone, FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa"


function App() {
  const [cart, setCart ] = useState([])
  console.log(cart);

  return (
    <div  >
      <div className="navv">

        <div>
          <img src={shortLogo} alt="" />
          <p>+998990925666</p>
        </div>
          
        <div>
          <p>Get 50% Off on the Selected items </p>
          <p>Shop now</p>
        </div>

        <div>
          <p>language</p>
          <p>location</p>
        </div>
      </div>

      <Router> 
        <header>
          <nav className='navbar'>
            <ul>
              <li>
                <NavLink
                  className={({isActive}) => (isActive ? "activeLink" : "")}
                  to='/'
                >Home</NavLink>
              </li>

              <li>
                <NavLink 
                  className={({ isActive }) => (isActive ? "activeLink" : "")}
                  to='/products'
                >Products</NavLink>
              </li>

              <li><a href="">Whats new</a></li>
              <li><a href="">Sales</a></li>
              <li><a href="">Help</a></li>
            
              <li>
                <NavLink to='/products/:productId'></NavLink>
              </li>

            </ul>
          </nav>

          <div className="icons">
            <FaSearch className="icon"/>
            <FaUser className="icon"/>
            <NavLink style={{position:"relative"}}  to='/cart'>
              <FaCartShopping className="icon" />
              <span>{cart.length}</span>
            </NavLink>
          </div>

        </header>
        <Routes>
          <Route selected path='/' element={<Home/>} />
          <Route path='/products' element={<Products/>} cart={cart} setCart={setCart}/>
          <Route path='/products/:productId' element={<Product/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
