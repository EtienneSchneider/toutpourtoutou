import React, { useLayoutEffect } from "react";

import SizeButtons from "../buttons/SizeButtons";
import Counter from "../buttons/ButtonPlus";
import "./ProductPage.scss";

const ProductPage = () => {
  useLayoutEffect(() => {}, []);

  return (
    <div className="DashBoard">
      

      <div className="fiche">
        <div className="product_img"> 
        <img src="../assets/Kong_toy.jpg" alt="" /></div>

        <div className="product_infos">

          <h1 className="header" id="nom">Nom du produit</h1>
          <p className="subheadertext">14.99€</p>

          <SizeButtons />
          <h2 className="subheadertext">Recommandé pour</h2>

          <h2 className="header">components pp</h2>



          <h2 className="subheadertext">Quantité prévue dans la prochaine commande</h2>


          <Counter />

          <p className="body" id="description">Le jouet KONG® Classic Puppy est spécialement conçu pour les dents de lait et les gencives fragiles du chiot en pleine croissance. Fabriqué en caoutchouc naturel, ce modèle de taille L est le plus doux de tous les jouets KONG®. Il aide le très jeune animal à adopter un bon comportement de mastication. Ce jouet pour chiot permet également de le divertir et le rebond ajoute une stimulation supplémentaire. Le KONG® Classic Puppy peut contenir des croquettes, des biscuits KONG® pour chiot ou de la pâte KONG® pour chiot (produits vendus séparément). </p>
          
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
