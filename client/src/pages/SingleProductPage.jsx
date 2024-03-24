import "./SingleProductPage.scss";
import ProductCounter from "../components/product_components/ProductCounter";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../contexts/AppContext.jsx";
import { Link, useParams } from "react-router-dom";

const SingleProductPage = () => {
    const productId = useParams().productId;
    const order = useRef({ id: null, defaultQuantity: 0 });
    const [productData, setProductData] = useState(null);
    const [counter, setCounter] = useState(0);

    const { appApi, userDetails } = useAppContext();

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            appApi
                .getProduct({
                    serialNumber: productId,
                })
                .then((response) => {
                    setProductData(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem("accessToken") && userDetails) {
            appApi
                .getUserOrders({
                    user: userDetails._id,
                })
                .then((response) => {
                    const allOrders = response.data;
                    if (allOrders.length > 0) {
                        const latestOrder = allOrders.sort(
                            (a, b) =>
                                new Date(b.orderDate) - new Date(a.orderDate),
                        )[0];
                        order.current.id = latestOrder._id;
                        const loProductMatch = latestOrder.orderedProducts.find(
                            (pr) => pr.serialNumber == productId,
                        );
                        order.current.defaultQuantity = loProductMatch
                            ? loProductMatch.quantity
                            : 0;
                        setCounter(order.current.defaultQuantity);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userDetails]);

    return productData ? (
        <div className="SingleProductPage">
            <section className="product-card bg-white">
                <div className="product-card-left">
                    <Link to={"/products"} className="back-link">
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                        Retour
                    </Link>

                    <img
                        src={
                            productData.image
                                ? productData.image
                                : "https://cashmailsystemaveceva.websites.co.in/dummytemplate/img/product-placeholder.png"
                        }
                        alt="product"
                    />
                </div>
                <div className="product-card-right">
                    <div className="product-card-right-title">
                        <h1 className="header">{productData.brand}</h1>
                        <span className="subheadertext">
                            {productData.price}
                        </span>
                        <p className="body">{productData.description}</p>
                    </div>
                    <div className="product-card-right-title">
                        <p className="body">
                            Quantité prévue dans la prochaine commande :
                        </p>
                        <div className="counter-and-check">
                            <ProductCounter
                                value={counter}
                                updateCounter={(count) => setCounter(count)}
                            />
                            {counter != order.current.defaultQuantity ? (
                                <button className="green-check">
                                    <span class="material-symbols-outlined">
                                        check_circle
                                    </span>
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    ) : (
        <></>
    );
};

export default SingleProductPage;
