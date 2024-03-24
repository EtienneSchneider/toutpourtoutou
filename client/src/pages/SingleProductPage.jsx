import "./SingleProductPage.scss";
import ProductCounter from "../components/product_components/ProductCounter";
import { useState, useEffect } from "react";

const SingleProductPage = ({ product, newOrder, updateNewOrder, goBack }) => {
    const [counter, setCounter] = useState(0);
    const updateCounter = (count) => {
        setCounter(count);
        updateNewOrder(product, count);
    };

    useEffect(() => {
        for (const item of newOrder) {
            if (item.serialNumber === product.serialNumber) {
                setCounter(item.quantity);
            }
        }
    }, []);

    return (
        <div className="SingleProductPage">
            <button className="backButton" onClick={goBack}>
                <span> Revenir aux produits</span>
            </button>
            <div className="fiche">
                <div className="product-img">
                    <img
                        src={
                            product.image
                                ? product.image
                                : "https://cashmailsystemaveceva.websites.co.in/dummytemplate/img/product-placeholder.png"
                        }
                        alt="product"
                    />
                </div>

                <div className="product-infos">
                    <h1 className="header" id="nom">
                        {product.brand}
                    </h1>
                    <p className="subheadertext">{product.price}</p>

                    <h2 className="subheadertext">
                        Quantité prévue dans la prochaine commande
                    </h2>
                    <ProductCounter
                        value={counter}
                        updateCounter={(count) => updateCounter(count)}
                    />
                    <p className="body" id="description">
                        {product.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
