import Image from "next/image";
import React from "react";
import styles from "../styles/ProductCard.module.css";
import Link from "next/link";

const ProductCard = ({ product }) => {
  // <-- prop here
  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`} passHref>
        <Image src={product.image} alt="" width="500" height="500" />
      </Link>

      <h1 className={styles.title}>{product.title}</h1>
      <span className={styles.price}>Rs. {product.prices[0]}</span>
      <p className={styles.desc}>{product.description}</p>
    </div>
  );
};

export default ProductCard;
