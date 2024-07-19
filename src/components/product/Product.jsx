import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productStyle from"./product.module.scss"
import { FaHeart, FaHeartCircleCheck } from "react-icons/fa6";

const baseURL = import.meta.env.VITE_BASE_URL;

const Product = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProductById() {
      const response = await fetch(`${baseURL}/products/${productId}`);
      const data = await response.json();
      setProduct(data);
    }

    fetchProductById();
  }, [productId]);

  return (
    <div className={productStyle.container}>

      <div className={productStyle.leftSide}>
        <div>{product && <img src={product.image_url} alt={product.product_name}   className="productStyle.img"/>}</div> 
      </div>

      <div className={productStyle.rightSide}>
        <div style={{
          fontSize:"4.8rem",
          marginBlock:"1.6rem"
      
        }}>{product && <h2>{product.name}</h2>}</div>

        <div style={{
          fontSize:"1.8rem",
          fontWeight:"500",
          lineHeight:"2.2rem",
          marginBlock:"1.6rem"

        }}>{product && <p>{product.description}</p>}</div>
        <hr/>

        <div style={{
          fontSize:"3.6rem",
          fontWeight:"700",
          marginBlock:"1.6rem"


        }}>{product && <h3>{product.price}$</h3>}</div>
        <p style={{fontSize:"1.8rem"}}>Suggested payments with 6 month  special financing</p>
        <hr />


        {/* <h4>Coose the color</h4>
        <div>{product && <p>{product.color}</p>}</div>
        <hr /> */}

        <div className={productStyle.adder}>
          <h5>+</h5>
          <h5>1</h5>
          <h5>-</h5>
        </div>

        <button className={productStyle.add}>Add to button</button>
        <button className={productStyle.heart}><FaHeart style={{fontSize:"2rem"}}/></button>


      
      </div>
      
    </div>
  )
};

export default Product;