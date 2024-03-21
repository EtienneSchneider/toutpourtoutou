import { Link } from "react-router-dom";
import "./ProductPage.scss";
import SizeButtons from "./SizeButtons";
import Counter from "./ButtonPlus";


const ProductPage = ({ title, desc, img_url, price }) => {
    return (
       


<div className="DashBoard">
      

    <div className="fiche">
        <div className="product_img"> 
        <img src={img_url} /></div>

        <div className="product_infos">

          <h1 className="header" id="nom">{title}</h1>
          <p className="subheadertext">{price}€</p>

          <SizeButtons />
          <h2 className="subheadertext">Recommandé pour</h2>

          <h2 className="header">components pp</h2>



          <h2 className="subheadertext">Quantité prévue dans la prochaine commande</h2>


          <Counter />

          <p className="body" id="description"> {desc} </p>
          
        </div>
      </div>
    </div>


   
    );
};

export default ProductPage;


