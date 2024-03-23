import React, { useState, useEffect } from "react";
import "./Products.scss";
import DeliveryProduct from "../components/product_components/DeliveryProduct";
import { useAppContext } from "../contexts/AppContext";
import ProductFocus from "../components/ProductFocus/ProductFocusPage";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [sortValue, setSortValue] = useState("az");
    const [sizeFilter, setSizeFilter] = useState("any");
    const [foodFilter, setFoodFilter] = useState("");
    const [onFocusProduct, setOnFocusProduct] = useState(false);
    const [focusedProduct, setFocusedProduct] = useState(null);
    const { appApi } = useAppContext();

    const [newOrder, setNewOrder] = useState([]);

    console.log(newOrder );

    const goBackFromFocus = () => {
        setOnFocusProduct(false);
        setFocusedProduct(null);
    };

    const focusOnProduct = (product) => {
        setOnFocusProduct(true);
        setFocusedProduct(product);
    };

    const getPriceValue = (price) => {
        return price.replace("€", "").replace(",", ".");
    };

    const updateNewOrder = (product, quantity) => {
        let found = false;
        for (let i = 0; i < newOrder.length; i++) {
            const item = newOrder[i];
            if (item.serialNumber === product.serialNumber) {
                if (quantity === 0) {
                    newOrder.splice(i, 1);
                } else {
                    newOrder[i].quantity = quantity;
                }
                found = true;
                break;
            }
        }
        
        if (!found && quantity > 0) {
            const newItem = {
                serialNumber: product.serialNumber,
                quantity: quantity
            };
            newOrder.push(newItem);
        }
        setNewOrder([...newOrder]);
    }
    
    

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
            {onFocusProduct && (
                <ProductFocus
                    product={focusedProduct}
                    goBack={goBackFromFocus}
                    updateNewOrder={updateNewOrder}
                    newOrder={newOrder}
                />
            )}
            {!onFocusProduct && (
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
                                            product={product}
                                            focusOnProduct={() =>
                                                focusOnProduct(product)
                                            }
                                        />
                                    ))
                                ) : (
                                    <p className="noOrder">
                                        Vous n'avez aucune commande pour
                                        l'instant
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
                                    onChange={(e) =>
                                        setSearchValue(e.target.value)
                                    }
                                />

                                <select
                                    className="filter_bar"
                                    onChange={(e) =>
                                        setSortValue(e.target.value)
                                    }
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

                            <select
                                name="Croquette"
                                id="Croquette"
                                onChange={(e) => setSizeFilter(e.target.value)}
                            >
                                <option value="">Non spécifié</option>
                                <option value="Croquette">Croquette</option>
                                <option value="Patés">Paté</option>
                            </select>

                            <h2 className="subheadertext">Marque</h2>
                            <select name="marque" id="marque">
                                <option value="nothing">Sans marque</option>
                                <option value="royaleCanin">
                                    Royale Canin
                                </option>
                                <option value="Purina">Purina</option>
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
                                        product={product}
                                        focusOnProduct={() =>
                                            focusOnProduct(product)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Products;
