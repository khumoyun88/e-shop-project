import { useState } from "react";
import { useEffect } from "react";
import styles from "./Products.module.scss";
import Card from '../card/Card'
import { useDispatch } from "react-redux";
import { addProducts } from "../../store/productsSlice";
import { useSelector } from "react-redux";
const baseURL = import.meta.env.VITE_BASE_URL

const Products = ({cart , setCart}) => {
    // const [products , setProducts] = useState([])
    const products = useSelector((store) => store.productsReducer.products);
    const dispatch = useDispatch()

    const [loading , setLoading] = useState(false)

    const [brands , setBrands] = useState([])
    const [selectedBrand , setSelectedBrand] = useState("")

    const [colors , setColors] = useState([])
    const [selectedColors , setSelectedColors] = useState("")

    // const [sort , setSort] = useState()



    useEffect(()=>{
        async function fetchBrands(){
            const response = await fetch(`${baseURL}/brands`);
            const data = await response.json();
            setBrands(data)
        }

        async function fetchColors(){
            const response = await fetch(`${baseURL}/colors`)
            const data = await response.json()
            setColors(data)
        }

        fetchBrands()
        fetchColors()
    },[])


    useEffect(() => {
        async function fetchProducts(){
         setLoading(true)

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
             const response = await fetch(`${query}`)
             const data = await response.json()
            //  setProducts(data)  
            dispatch(addProducts(data)) 
         } catch (error) {
             console.error('error')
             
         }finally{
             setLoading(false)
         }
 
        }
        
        fetchProducts() 

     } ,[selectedBrand , selectedColors])
 



     

    


    return (
        <div className={styles.container}>
            <aside>

                <div>
                    {/* <h3>Price</h3>
                    <select name="" id="">
                      <option  selected value="">reset</option>
                      <option value="increase">incease</option>
                      <option value="">decrease</option>
                    </select> */}

                    <h3>Brand</h3>
                    <ul  className={styles.colorsContainer}>
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
                        {colors.map((colors, index) => (
                        <li 
                            key={index}>
                            <div 
                            style={{
                                backgroundColor:colors, 
                                outline : selectedColors === colors ? "3px solid black" : ""}}
                            className={styles.color}
                            onClick={() => setSelectedColors(colors)}/>     
                        </li>
                        ))}
                    </ul>
                </div>


            </aside>
            <main>
        {loading ? (
          <p>Loading...</p>
        ) : products.length ? (
          <div className={styles.grid}>
            {products.map((product) => (
              <Card key={product.id} product={product} cart={cart} setCart={setCart}  />
            ))}
          </div>
        ) : (
          <p>No products</p>
        )}
            </main>
                       
        </div>
    )
}
export default Products