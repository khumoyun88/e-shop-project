import { useEffect, useState } from 'react';
import cartStyle from "./cart.module.scss";
const Cart = ({ cart }) => {
  const [products, setProducts] = useState([]);
  const baseURL = import.meta.env.VITE_BASE_URL;

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
        <h1>Products in Cart</h1>
        <div className={cartStyle.container}>
      
      <ul className={cartStyle.products} >
        {products.map((product, index) => (
          <li className={cartStyle.product} style={{color:"black"}} key={index}>
            <img src={product.image_url} alt={product.name} style={{ width: '100px', height: '100px' }} />
            <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            </div>
            

            <p>{product.price}$</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Cart;
