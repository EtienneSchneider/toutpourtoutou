import "./LastOrder.scss";
import { ProductPreview, ProductPreviewWithPrices } from "./ProductPreview";

const LastOrderList = ({ products, orderList, withPrices }) => {
    return (
        <div className="LastOrderList">
            {products && orderList ? (
                products.map((prod) => {
                    return !withPrices ? (
                        <ProductPreview
                            key={prod.serialNumber}
                            title={prod.brand}
                            desc={prod.description}
                            sN={prod.serialNumber}
                            img_url={
                                prod.image
                                    ? prod.image
                                    : "https://cashmailsystemaveceva.websites.co.in/dummytemplate/img/product-placeholder.png"
                            }
                            count={
                                orderList.orderedProducts.find(
                                    (a) => a.serialNumber === prod.serialNumber,
                                ).quantity
                            }
                        />
                    ) : (
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
                            count={
                                orderList.orderedProducts.find(
                                    (a) => a.serialNumber === prod.serialNumber,
                                ).quantity
                            }
                            price={prod.price}
                        />
                    );
                })
            ) : (
                <></>
            )}
        </div>
    );
};

export default LastOrderList;
