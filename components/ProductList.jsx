import React from "react";
import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({ productList }) => {
  // <-- props here
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA FOR FAST FOOD LOVERS</h1>
      <p className={styles.description} id="products">
        🍕 The best selection of most popular pizzas in Kathmandu 🍕
        <br />
      </p>

      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
