import React, { useState, useEffect } from "react";
import "./Products.scss";
import DeliveryProduct from "../components/product_components/DeliveryProduct";
import { AppApi } from "../../Service/Api";
import { useAppContext } from "../contexts/AppContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState("az");
    const [sizeFilter, setSizeFilter] = useState("any");
    const [foodFilter, setFoodFilter] = useState("");
    const { appApi } = useAppContext();

    const getPriceValue = (price) => {
        return price.replace("€", "").replace(",", ".");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await appApi.getAllProducts();
                setProducts(productsResponse.data);

                const orderResponse = await appApi.getUserOrders();
                setOrder(orderResponse.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter(
        (product) =>
            product.brand.toLowerCase().includes(searchValue.toLowerCase()) &&
            (sizeFilter === "any" ||
                product.dogType === sizeFilter ||
                sizeFilter === "") &&
            (foodFilter === "any" ||
                product.type === foodFilter ||
                foodFilter === ""),
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortValue === "az") {
            return a.brand.localeCompare(b.brand);
        } else if (sortValue === "za") {
            return b.brand.localeCompare(a.brand);
        } else if (sortValue === "asc") {
            return (
                parseFloat(getPriceValue(a.price)) -
                parseFloat(getPriceValue(b.price))
            );
        } else if (sortValue === "desc") {
            return (
                parseFloat(getPriceValue(b.price)) -
                parseFloat(getPriceValue(a.price))
            );
        }
    });

    return (
        <>
            <div className="container-product-top">
                <h1 className="header" id="type">
                    Votre prochaine commande
                </h1>
                <div className="delivery">
                    <div className="delivery-list">
                        {order.length > 0 ? (
                            order.map((product, index) => (
                                <DeliveryProduct
                                    key={index}
                                    title={product.brand}
                                    desc={product.description}
                                    img={
                                        "https://static8.depositphotos.com/1338574/829/i/450/depositphotos_8292951-stock-photo-the-letter-c-in-gold.jpg"
                                    }
                                    price={product.price}
                                />
                            ))
                        ) : (
                            <p className="noOrder">
                                Vous n'avez aucune commande pour l'instant
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="container-product-bottom">
                <h1 className="header" id="type">
                    Notre catalogue
                </h1>

                <div className="filter">
                    <h2 className="subheadertext">Type</h2>

                    <div className="searchFilter-bar">
                        <input
                            className="searchBar"
                            type="text"
                            placeholder="Rechercher un produit"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />

                        <select
                            className="filter_bar"
                            onChange={(e) => setSortValue(e.target.value)}
                        >
                            <option value="">Trier par</option>
                            <option value="az">De A à Z</option>
                            <option value="za">De Z à A</option>
                            <option value="asc">Du - au + cher</option>
                            <option value="desc">Du + au - cher</option>
                        </select>
                    </div>

                    <select
                        name="nourriture"
                        id="nourriture"
                        onChange={(e) => setFoodFilter(e.target.value)}
                    >
                        <option value="">Non spécifié</option>
                        <option value="food">Nourriture</option>
                        <option value="toy">Jouet</option>
                        <option value="hygiene">Hygiène</option>
                    </select>

                    

                    

                    <h2 className="subheadertext">Taille du chien</h2>
                    <select
                        name="tailleChien"
                        id="tailleChien"
                        onChange={(e) => setSizeFilter(e.target.value)}
                    >
                        <option value="">Non spécifié</option>
                        <option value="dog">Adulte</option>
                        <option value="puppy">Enfant</option>
                        <option value="sterilized">Stérilisé</option>
                    </select>

                    <div className="product-list">
                        {sortedProducts.map((product, idx) => (
                            <DeliveryProduct
                                key={idx}
                                title={product.brand}
                                desc={product.description}
                                img={product.image || "https://cashmailsystemaveceva.websites.co.in/dummytemplate/img/product-placeholder.png"}
                                price={product.price}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Products;
