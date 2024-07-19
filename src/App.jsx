// import { useState } from 'react'
import mainLogo from '../public/GameGeek1.png'
import shortLogo from "../public/GG.png"
import './App.css'
import { BrowserRouter as Router , Routes , Route ,NavLink} from "react-router-dom"
import Home from "./components/home/Home"
import Products from "./components/products/Products"
import Product from "./components/product/Product"
import { useState } from "react"
import Cart from "./components/cart/Cart";
import { FaAngleDown, FaCartShopping, FaMapLocation, FaUser } from "react-icons/fa6"
import { FaSearch } from "react-icons/fa"




// import { FaCartShopping, FaUser, FaSearch } from "react-icons/fa6";


function App() {
  const [cart, setCart ] = useState([])
  const [add, setAdd] = useState([]);

  const [sort , setSort] = useState("")
    // console.log(sort);

  return (
    <div  >
      <div className="navv">

        <div>
          <img src={shortLogo} alt="" />
          <p>+998990925666</p>
        </div>
          
        <div>
          <p style={ {borderRight:"3px solid #fff"}}>Get 50% Off on the Selected items </p>
          <p>Shop now</p>
        </div>

        <div>
          <p> <FaAngleDown style={{marginRight:"1.5px"}} /> Language</p>
          <p> <FaMapLocation style={{marginRight:"1.5px"}}/> Location</p>
        </div>
      </div>

      <Router > 
        <header >
          <img style={{width:"30rem" , paddingBlock:"10px"}} src={mainLogo} alt="" />


          <nav className='navbar'>
            <ul>
              <li >
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
                <span className="cunterSapan">{cart.length}</span>
            </NavLink>
            
          </div>


        </header>


        {/* <div>
          <h4>sort by price</h4>
          <select name="" value={sort}  onChange={(e) => setSort(e.target.value)}>
            <option  value="">reset</option>
            <option value="increase">incease</option>
            <option value="decrease">decrease</option>
          </select>
        </div> */}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<Products cart={cart} setCart={setCart} setAdd={setAdd} />}  sort={sort}/>
          <Route path='/products/:productId' element={<Product/>} />
          <Route path='/cart' element={<Cart cart={cart}/>} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
