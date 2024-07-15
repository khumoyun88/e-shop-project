import { useState } from "react";
import { useEffect } from "react";
import styles from "./Products.module.scss";



const baseURL = import.meta.env.VITE_BASE_URL
const Products = () => {
    const [brands , setBrands] = useState([])
    const [selectedBrand , setSelectedBrand] = useState([])

    const [colors , setColors] = useState([])
    const [selectedColors , setSelectedColors] = useState([])

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


    return (
        <div className={styles.container}>
            <aside>

                <div>
                    <h3>Brand</h3>
                    <ul  className={styles.colorsContainer}>
                        {brands.map((brand, index) => (
                        <li key={index}>
                            <input
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
            <main></main>
            
        </div>
    )
}
export default Products