import { Link } from "react-router-dom";
import "./DeliveryProduct.scss";
import "./ProductCounter.scss";
import ButtonPlus from "./ProductCounter";

const DeliveryProduct = ({ title, desc, link, img_url, price }) => {
    return (
        <Link to={link} className="DeliveryProduct bg-default">
            <div className="img-container">
                <img className="img" src={img_url} alt="" />
                <div className="buttonPlusProduct">
                    <ButtonPlus />
                </div>
            </div>

            <div className="text-container">
                <span className="col-black">{title}</span>
                <p className="col-black">{price}€</p>
                <p className="col-gray">{desc}</p>
            </div>
        </Link>
    );
};

export default DeliveryProduct;
