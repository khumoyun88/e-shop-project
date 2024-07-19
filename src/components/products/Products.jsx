import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Products.module.scss";
import Card from '../card/Card';
import { addProducts } from "../../store/productsSlice";
const baseURL = import.meta.env.VITE_BASE_URL;

const Products = ({ cart, setCart, sort , setAdd }) => {
  const products = useSelector((store) => store.productsReducer.products);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState("");

  useEffect(() => {
    async function fetchBrands() {
      const response = await fetch(`${baseURL}/brands`);
      const data = await response.json();
      setBrands(data);
    }

    async function fetchColors() {
      const response = await fetch(`${baseURL}/colors`);
      const data = await response.json();
      setColors(data);
    }

    fetchBrands();
    fetchColors();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      let query = `${baseURL}/products`;

      const params = [];
      if (selectedColors) {
        params.push(`color_options_like=${encodeURIComponent(selectedColors)}`);
      }
      if (selectedBrand) {
        params.push(`brand_name=${encodeURIComponent(selectedBrand)}`);
      }

      if (params.length > 0) {
        query += `?${params.join("&")}`;
      }

      try {
        const response = await fetch(query);
        const data = await response.json();
        dispatch(addProducts(data));
      } catch (error) {
        console.error('error', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedBrand, selectedColors, dispatch]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "increase") {
      return a.price - b.price;
    } else if (sort === "decrease") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  return (
    <div className={styles.container}>
      <aside>
        <div>
          <h3>Brand</h3>
          <ul className={styles.colorsContainer}>
            {brands.map((brand, index) => (
              <li key={index}>
                <input
                  className="radio-input"
                  type='radio'
                  value={brand}
                  name='brand'
                  id={brand}
                  checked={brand === selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                />
                <label htmlFor={brand}>{brand}</label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Colors</h3>
          <ul className={styles.colorsContainer}>
            {colors.map((color, index) => (
              <li key={index}>
                <div
                  style={{
                    backgroundColor: color,
                    outline: selectedColors === color ? "3px solid black" : ""
                  }}
                  className={styles.color}
                  onClick={() => setSelectedColors(color)}
                />
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : sortedProducts.length ? (
          <div className={styles.grid}>
            {sortedProducts.map((product) => ( // Use sortedProducts here
              <Card 
                key={product.id}
                product={product} 
                cart={cart} 
                setCart={setCart}
                setAdd={setAdd} />
            ))}
          </div>
        ) : (
          <p>No products</p>
        )}
      </main>
    </div>
  );
}

export default Products;
