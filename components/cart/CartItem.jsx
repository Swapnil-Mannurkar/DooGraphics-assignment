"use client";
import React, { useState } from "react";
import styles from "./CartItem.module.css";
import Image from "next/image";
import { ImBin2 } from "react-icons/im";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { addToCartHelper } from "@/lib/cart";
import Modal from "../ui/Modal";

const CartItem = ({ item }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const addToCartHandler = async () => {
    setMessage("Adding item to cart...");
    setIsLoading(true);

    const product = { ...item };
    product.quantity = 1;

    const response = await addToCartHelper({
      product,
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
          <h2>{message}</h2>
        </Modal>
      )}
      <div className={styles.cartItem}>
        <div className={styles.image}>
          <Image
            src={item.image}
            alt={item.title}
            width={500}
            height={500}
            priority
          />
        </div>
        <h2>{item.title}</h2>
        <div className={styles.actions}>
          <div className={styles.quantityActions}>
            <p className={styles.quantityControl}>-</p>
            <p>{item.quantity}</p>
            <p className={styles.quantityControl} onClick={addToCartHandler}>
              +
            </p>
          </div>
          <ImBin2 className={styles.delete} />
        </div>
      </div>
    </>
  );
};

export default CartItem;
