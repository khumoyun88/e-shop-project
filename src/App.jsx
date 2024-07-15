// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router , Routes , Route ,NavLink} from "react-router-dom"
import Home from "./components/home/Home"
import Products from "./components/products/Products"
import InCart from "./components/inCart/InCart"



function App() {


  return (
    <div>
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
              {/* <li>
                <Link to='/products/:productId'>Cart</Link>
              </li> */}
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/products/:productId' element={<InCart/>} />




        
        </Routes>
      </Router>
    </div>
  )
}

export default App
