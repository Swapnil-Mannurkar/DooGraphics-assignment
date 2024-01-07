import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { addToCartHelper } from "@/lib/cart";
import Modal from "../ui/Modal";

const ProductDetails = ({ product }) => {
  const router = useRouter();
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const { id, title, price, description, image } = {
    ...product,
  };

  const addToCartHandler = async () => {
    setIsLoading(true);
    const product = { id, title, price, image, quantity: 1 };

    const response = await addToCartHelper({
      item: product,
      username: data.user.name,
    });

    if (response) {
      router.replace("/cart");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <Modal>
          <h2>Adding item to the cart...</h2>
        </Modal>
      )}
      <main className={styles.main}>
        <h2>{title}</h2>
        <div className={styles.product}>
          <div className={styles.image}>
            <Image src={image} alt={title} width={200} height={200} priority />
          </div>
          <div className={styles.productDetail}>
            <h3>$ {price}</h3>
            <p>{description}</p>
            <button
              onClick={addToCartHandler}
              disabled={status !== "authenticated"}
            >
              Add to cart
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
