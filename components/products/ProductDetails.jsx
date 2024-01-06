import React from "react";
import styles from "./ProductDetails.module.css";
import Image from "next/image";

const ProductDetails = ({ product }) => {
  const { id, title, price, description, category, image, rating } = {
    ...product,
  };

  return (
    <main className={styles.main}>
      <h2>{title}</h2>
      <div className={styles.product}>
        <div className={styles.image}>
          <Image src={image} alt={title} width={200} height={200} />
        </div>
        <div className={styles.productDetail}>
          <h3>$ {price}</h3>
          <p>{description}</p>
          <button>Add to cart</button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
