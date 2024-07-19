import { FaCartShopping } from "react-icons/fa6";

import Button from "../button/Button";
import styles from "./card.module.scss";
import { Link } from "react-router-dom";




const Card = ({ product, cart, setCart }) => {

  
  return (
    <div>
      
      <img style={{
        backgroundColor:"#ccc9c9",


      }} 
      src={product.image_url} 
      alt={product.product_name} />
      
      <h4 style={{marginBlock:" 0 0.5rem"}}>
        <Link to={`/products/${product.id}`}>{product.name}</Link>
      </h4>

      <p>{product.description}</p>

      <div className={styles.colors}>
        {product.color_options.map((color, index) => (
          <div
            key={index}
            style={{
                background: color,
            }}
            className={styles.color}

            
          />
        ))}
      </div>

      <strong>{product.price}$</strong>
      <div>
        <Button
         onClick={() => setCart([...cart ,product.id])}>
          <FaCartShopping />
          <span style={{ 
            marginLeft: "0.8em",
           }}>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};

export default Card;