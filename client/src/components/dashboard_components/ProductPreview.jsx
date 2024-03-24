import { Link } from "react-router-dom";
import "./ProductPreview.scss";

const ProductPreview = ({ title, desc, sN, img_url, count }) => {
    return (
        <Link to={"/products/" + sN} className="ProductPreview bg-default">
            <span className="product-count bg-accent col-white">{count}</span>
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

const ProductPreviewWithPrices = ({
    title,
    desc,
    sN,
    img_url,
    price,
    count,
}) => {
    return (
        <Link
            to={"/products/" + sN}
            className="ProductPreviewWithPrices bg-default"
        >
            {count > 0 ? (
                <span className="product-count bg-accent col-white">
                    {count}
                </span>
            ) : (
                <></>
            )}
            <div className="img-container">
                <img src={img_url} alt="" />
            </div>
            <div className="text-container">
                <span className="col-black prod-title">{title}</span>
                <p className="col-gray body">{price}</p>
                <p className="col-gray formfield">{desc}</p>
            </div>
        </Link>
    );
};

export { ProductPreview, ProductPreviewWithPrices };
export default ProductPreview;
