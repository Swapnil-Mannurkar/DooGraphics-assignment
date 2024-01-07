import React from "react";
import styles from "./Product.module.css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { addToCartHelper } from "@/lib/cart";

const Product = ({ product }) => {
  const router = useRouter();
  const { data, status } = useSession();

  const { id, title, price, image, rating } = {
    ...product,
  };

  const viewDetailsHandler = () => {
    router.replace(`/product/${id}`);
  };

  const addToCartHandler = async () => {
    if (status === "unauthenticated") {
      router.replace("/auth");
      return;
    }

    const product = { id, title, price, image, quantity: 1 };

    const response = await addToCartHelper({
      product,
      username: data.user.name,
    });

    if (response) {
      router.replace("/cart");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.product} onClick={viewDetailsHandler}>
        <div className={styles.image}>
          <Image src={image} alt={title} width={500} height={500} priority />
        </div>
        <div className={styles.productDetails}>
          <h3>{title}</h3>
          <div className={styles.priceRating}>
            <h4>${price}</h4>
            <p className={styles.rating}>
              <FaStar className={"text-yellow-400"} /> {rating.rate} (
              {rating.count})
            </p>
          </div>
        </div>
      </div>
      <div className={styles.action}>
        {status === "authenticated" && (
          <button onClick={addToCartHandler}>Add to cart</button>
        )}
      </div>
    </main>
  );
};

export default Product;
