import { Link } from "react-router-dom";
import "./DeliveryProduct.scss";
import "./ButtonPlus.scss";

import ButtonPlus from './ButtonPlus'

const DeliveryProduct = ({ title, desc, link, img_url }) => {
    return (
        <Link to={link} className="DeliveryProduct bg-default">
        <div className="img-container">
            <img className="img" src={img_url} alt="" />
            <ButtonPlus className="buttonPlusD"/>
            
        </div>
        
        <div className="text-container">
            <span className="col-black">{title}</span>
            <p className="col-gray">{desc}</p>

            
        </div>
    </Link>
    




    );
};

export default DeliveryProduct;
