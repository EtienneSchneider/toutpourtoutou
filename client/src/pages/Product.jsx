import React, { useLayoutEffect } from "react";
import NavBar from "../components/NavBar";
import SizeButtons from "../components/SizeButtons";
import Counter from "../components/ButtonPlus"
import "./Product.scss";

const Product = () => {
  useLayoutEffect(() => {}, []);

  return (
    <div className="DashBoard">
      <NavBar />

      <div className="fiche">
        <div className="product_img"> {}</div>

        <div className="product_infos">
          <SizeButtons />
          <Counter />
          
        </div>
      </div>
    </div>
  );
};

export default Product;
