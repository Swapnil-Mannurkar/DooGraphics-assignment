import React from "react";
import styles from "./Product.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/router";

const Product = ({ product }) => {
  const router = useRouter();
  const { id, title, price, description, category, image, rating } = {
    ...product,
  };

  const viewDetailsHandler = () => {
    router.replace(`/product/${id}`);
  };

  const addToCartHandler = async () => {
    const response = await fetch("/api/cart/addToCart", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className={styles.product}>
      <div className={styles.image}>
        <Image src={image} alt={title} width={500} height={500} priority />
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
          <button onClick={viewDetailsHandler}>View Details</button>
          <button onClick={addToCartHandler}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
