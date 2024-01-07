import React from "react";
import styles from "./ProductDetails.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { addToCartHelper } from "@/lib/cart";

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { data, status } = useSession();

  const { id, title, price, description, image } = {
    ...product,
  };

  const addToCartHandler = async () => {
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
      <h2>{title}</h2>
      <div className={styles.product}>
        <div className={styles.image}>
          <Image src={image} alt={title} width={200} height={200} />
        </div>
        <div className={styles.productDetail}>
          <h3>$ {price}</h3>
          <p>{description}</p>
          {status === "authenticated" && (
            <button onClick={addToCartHandler}>Add to cart</button>
          )}
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
