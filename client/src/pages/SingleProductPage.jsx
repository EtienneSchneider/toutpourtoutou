import { Link } from "react-router-dom";
import "./SingleProductPage.scss";
import VariantSelector from "../components/product_components/VariantSelector";
import ProductCounter from "../components/product_components/ProductCounter";

const SingleProductPage = ({ title, desc, img_url, price }) => {
    return (
        <div className="SingleProductPage">
            <div className="fiche">
                <div className="product-img">
                    <img src={img_url} />
                </div>

                <div className="product-infos">
                    <h1 className="header" id="nom">
                        {title}
                    </h1>
                    <p className="subheadertext">{price}€</p>

                    {/* <VariantSelector />
                    <h2 className="subheadertext">Recommandé pour</h2>

                    <h2 className="header">components pp</h2>
*/
                    <h2 className="subheadertext">
                        Quantité prévue dans la prochaine commande
                    </h2> }

                    <ProductCounter />

                    <p className="body" id="description">
                       
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SingleProductPage;
