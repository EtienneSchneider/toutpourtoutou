import { Link } from "react-router-dom";
import "./DeliveryProduct.scss";
import "./ProductCounter.scss";
import ProductCounter from "./ProductCounter";
import { useState } from "react";

const DeliveryProduct = ({ title, desc, link, img, price }) => {
    const [quantity, setQuantity] = useState(0)
    return (
        <Link to={link} className="DeliveryProduct bg-default">
            <div className="img-container">
                <img className="img" src={img} alt="" />
                <div className="buttonPlusProduct">
                    <ProductCounter value={quantity} updateCounter={(count) => setQuantity(count)} />
                </div>
            </div>

            <div className="info-container">
                <div className="text-container"> 
                <span className="col-black">{title}</span>
                <p className="col-black">{price}</p>
                <p className="col-gray">{desc}</p>
                </div>
            </div>
        </Link>
    );
};

export default DeliveryProduct;
