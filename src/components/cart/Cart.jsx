import { useEffect, useState } from 'react';
import cartStyle from "./cart.module.scss";
const Cart = ({ cart }) => {
  const [products, setProducts] = useState([]);
  
  const baseURL = import.meta.env.VITE_BASE_URL;



  // const [count, setCount] = useState(0);


  useEffect(() => {
    
    const fetchProducts = async () => {
      try {
        const productData = await Promise.all(
          cart.map(async (id) => {
            const response = await fetch(`${baseURL}/products/${id}`);
            if (!response.ok) {
              throw new Error(`Error fetching product with id ${id}`);
            }
            const data = await response.json();
            return data;
          })
        );
        setProducts(productData);
      } catch (error) {
        console.error('Error fetching product data:', error);
        // Optionally handle the error, e.g., set a default product or an error message
      }
    };

    fetchProducts();
  }, [cart, baseURL]);

  return (
    <div>
      <h1>SHOPPING CART</h1>
        <div className={cartStyle.container}>
      
          <ul className={cartStyle.products} >
            {products.map((product, index) => (
              <li className={cartStyle.product} style={{color:"black"}} key={index}>
                <img src={product.image_url} alt={product.name} style={{ width: '100px', height: '100px' }} />
                <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                </div>


                {/* <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <h1>Counter: {count}</h1>
                  <button onClick={setCount(count+1)}>Increment</button>
                  <button onClick={setCount-1} style={{ marginLeft: '10px' }}>Decrement</button>
                </div> */}
                

                <p>{product.price}$</p>
              </li>
            ))}
          </ul>

          <div className={cartStyle.total}>
            <h3>Cart Total</h3>
            <h4 >Totoal: </h4>
            <button>buy now</button>
          </div>
        </div>

        
    </div>
  );
};

export default Cart;
