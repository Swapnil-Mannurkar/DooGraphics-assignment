import React from "react";
import styles from "./Product.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const Product = ({ product }) => {
  const { id, title, price, description, category, image, rating } = {
    ...product,
  };

  return (
    <div className={styles.product}>
      <div className={styles.image}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.productDetails}>
        <h3>{title}</h3>
        <div className={styles.priceRating}>
          <h4>$ {price}</h4>
          <p className={styles.rating}>
            <FaStar className={"text-yellow-400"} /> {rating.rate} (
            {rating.count})
          </p>
        </div>
        <div className={styles.action}>
          <button>View Details</button>
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
