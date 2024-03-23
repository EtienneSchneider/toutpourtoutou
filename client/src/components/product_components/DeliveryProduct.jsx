import "./DeliveryProduct.scss";
import "./ProductCounter.scss";
import { GoArrowRight } from "react-icons/go";

const DeliveryProduct = ({product, focusOnProduct}) => {

    return (
        <div className="DeliveryProduct bg-default">
            <div className="img-container">
                <img className="img" src={product.image ? product.image : 'https://cashmailsystemaveceva.websites.co.in/dummytemplate/img/product-placeholder.png'} alt=""/>
            </div>

            <div className="info-container">
                <div className="text-container"> 
                <div className="brandContainer">
                    {product.brand}
                    <button onClick={focusOnProduct}><GoArrowRight /></button>
                </div>
                <p className="col-black">{product.price}</p>
                <p className="col-gray">{product.description}</p>
                </div>
            </div>
        </div >
    );
};

export default DeliveryProduct;
