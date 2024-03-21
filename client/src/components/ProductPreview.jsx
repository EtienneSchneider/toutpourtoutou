import { Link } from "react-router-dom";
import "./ProductPreview.scss";

const ProductPreview = ({ title, desc, link, img_url }) => {
    return (
        <Link to={link} className="ProductPreview bg-default">
            <div className="img-container">
                <img src={img_url} alt="" />
            </div>
            <div className="text-container">
                <span className="col-black">{title}</span>
                <p className="col-gray">{desc}</p>
            </div>
        </Link>
    );
};

export default ProductPreview;
