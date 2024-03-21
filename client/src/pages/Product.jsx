import "./Product.scss";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import DeliveryProduct from "../components/DeliveryProduct";


const Product = () => {
    const [products, setProducts] = useState([1]);


    
    return (


        
        <div className="delivery">
        
        <div className="delivery-list">
            {products.map(() => {
                return (
                            <DeliveryProduct
                        title={"Friskies® Light"}
                        desc="Croquettes allégées au poulet pour chien en surpoids"
                        img_url={
                            "https://www.purina.fr/sites/default/files/styles/product_380x380/public/2022-01/1.%20MHI%2007613033831287_H1N1_FR_44074316-RESIZED.png?itok=cM3h0tUG"
                        }
                    />
                );
            })}
        </div>
    </div>


      );
};

export default Product;
