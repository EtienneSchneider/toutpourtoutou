import React, { useState } from "react";
import "./Products.scss";
import DeliveryProduct from "../components/product_components/DeliveryProduct";

const Products = () => {
    const [products, setProducts] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [searchTerm, setSearchTerm] = useState("");

    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const productChunks = chunkArray(products, 3); // Diviser les produits en groupes de 3 éléments

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <>
            <div className="container_product_top">
                <h1 className="header" id="type">
                    Votre prochaine commande
                </h1>
                <div className="delivery">
                    <div className="delivery-list">
                        {products.map((product, index) => (
                            <DeliveryProduct
                                key={index}
                                title={"Friskies® Light"}
                                desc="Croquettes allégées au poulet pour chien en surpoids"
                                img_url={
                                    "https://www.purina.fr/sites/default/files/styles/product_380x380/public/2022-01/1.%20MHI%2007613033831287_H1N1_FR_44074316-RESIZED.png?itok=cM3h0tUG"
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="container_product_top">
                <h1 className="header" id="type">
                    Notre catalogue
                </h1>
                <input
                    type="text"
                    placeholder="Rechercher par titre..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="container_product_top">
                <div className="delivery" id="delivery2">
                    {productChunks.map((chunk, index) => (
                        <div key={index} className="delivery-row">
                            {chunk.map((product, idx) => (
                                <DeliveryProduct
                                    key={idx}
                                    title={"Friskies® Light"}
                                    desc="Croquettes allégées au poulet pour chien en surpoids"
                                    img_url={
                                        "https://www.purina.fr/sites/default/files/styles/product_380x380/public/2022-01/1.%20MHI%2007613033831287_H1N1_FR_44074316-RESIZED.png?itok=cM3h0tUG"
                                    }
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Products;
