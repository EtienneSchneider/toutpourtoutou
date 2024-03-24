import React, { useState, useEffect, useRef } from "react";
import "./Products.scss";
import LastOrderList from "../components/dashboard_components/LastOrder";
import { ProductPreviewWithPrices } from "../components/dashboard_components/ProductPreview";
import { useAppContext } from "../contexts/AppContext";
import { getUniquePropertyValues, sortData } from "../helpers/functions";

const Products = () => {
    const [allProducts, setAllProducts] = useState(null);
    const [order, setOrder] = useState(null);

    const filterPropositioins = useRef({
        type: [],
        dogType: [],
        brand: [],
    });
    const [filterValues, setFilterValues] = useState({
        search: "",
        type: "",
        dogType: "",
        brand: "",
        sort: "",
    });

    const { appApi, userDetails } = useAppContext();

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
                        setOrder(latestOrder);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [userDetails]);

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            appApi
                .getAllProducts()
                .then((response) => {
                    setAllProducts(response.data);
                    filterPropositioins.current.dogType =
                        getUniquePropertyValues(response.data, "dogType");
                    filterPropositioins.current.type = getUniquePropertyValues(
                        response.data,
                        "type",
                    );
                    filterPropositioins.current.brand = getUniquePropertyValues(
                        response.data,
                        "brand",
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <div className="Products">
            <section className="order-section bg-white">
                <h2 className="subheadertext">Votre prochaine commande</h2>
                {order && allProducts ? (
                    <LastOrderList
                        products={order.orderedProducts.map((or) =>
                            allProducts.find(
                                (prod) => or.serialNumber === prod.serialNumber,
                            ),
                        )}
                        orderList={order}
                        withPrices={true}
                    />
                ) : (
                    <></>
                )}
            </section>
            <section className="catalogue-section bg-white">
                <h2 className="subheadertext">Notre catalogue</h2>
                <div className="catalogue-section-content">
                    <div className="catalogue-filters">
                        <label htmlFor="marque">Marque</label>
                        <select
                            name="marque"
                            id="marque"
                            onChange={(e) =>
                                setFilterValues((prev) => ({
                                    ...prev,
                                    brand: e.target.value,
                                }))
                            }
                        >
                            <option value="">Non spécifié</option>

                            {filterPropositioins.current.brand.map((prop) => (
                                <option value={prop}>{prop}</option>
                            ))}
                        </select>
                        <label htmlFor="ageChien">Age du chien</label>
                        <select
                            name="ageChien"
                            id="ageChien"
                            onChange={(e) =>
                                setFilterValues((prev) => ({
                                    ...prev,
                                    dogType: e.target.value,
                                }))
                            }
                        >
                            <option value="">Non spécifié</option>

                            {filterPropositioins.current.dogType.map((prop) =>
                                prop === "" ? (
                                    <></>
                                ) : (
                                    <option value={prop}>{prop}</option>
                                ),
                            )}
                        </select>
                        <label htmlFor="type">Type</label>
                        <select
                            name="type"
                            id="type"
                            onChange={(e) =>
                                setFilterValues((prev) => ({
                                    ...prev,
                                    type: e.target.value,
                                }))
                            }
                        >
                            <option value="">Non spécifié</option>

                            {filterPropositioins.current.type.map((prop) => (
                                <option value={prop}>{prop}</option>
                            ))}
                        </select>
                    </div>
                    <div className="catalogue-search">
                        <input
                            className="search-bar"
                            type="search"
                            placeholder="Rechercher un produit"
                            value={filterValues.search}
                            onChange={(e) =>
                                setFilterValues((prev) => ({
                                    ...prev,
                                    search: e.target.value,
                                }))
                            }
                        />

                        <select
                            className="filter-bar"
                            onChange={(e) =>
                                setFilterValues((prev) => ({
                                    ...prev,
                                    sort: e.target.value,
                                }))
                            }
                        >
                            <option value="">Trier par</option>
                            <option value="a-z">De A à Z</option>
                            <option value="z-a">De Z à A</option>
                            <option value="asc">Du - au + cher</option>
                            <option value="desc">Du + au - cher</option>
                        </select>
                    </div>
                    <div className="catalogue-grid">
                        {allProducts ? (
                            sortData(allProducts, filterValues.sort)
                                .filter((prod) =>
                                    prod.dogType.includes(filterValues.dogType),
                                )
                                .filter((prod) =>
                                    prod.brand.includes(filterValues.brand),
                                )
                                .filter((prod) =>
                                    prod.type.includes(filterValues.type),
                                )
                                .filter(
                                    (prod) =>
                                        prod.brand
                                            .toLowerCase()
                                            .includes(
                                                filterValues.search.toLowerCase(),
                                            ) ||
                                        prod.description
                                            .toLowerCase()
                                            .includes(
                                                filterValues.search.toLowerCase(),
                                            ),
                                )
                                .map((prod) => (
                                    <ProductPreviewWithPrices
                                        key={prod.serialNumber}
                                        title={prod.brand}
                                        desc={prod.description}
                                        sN={prod.serialNumber}
                                        img_url={
                                            prod.image
                                                ? prod.image
                                                : "https://cashmailsystemaveceva.websites.co.in/dummytemplate/img/product-placeholder.png"
                                        }
                                        count={0}
                                        price={prod.price}
                                    />
                                ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Products;
