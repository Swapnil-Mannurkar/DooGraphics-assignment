import React, { useState } from "react";
import styles from "./CartItem.module.css";
import Image from "next/image";
import { ImBin2 } from "react-icons/im";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { addToCartHelper, reduceItemHelper } from "@/lib/cart";
import Modal from "../ui/Modal";

const CartItem = ({ item }) => {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = async (action) => {
    setIsLoading(true);

    let response;
    const username = data.user.name;

    if (action === "increase") {
      setMessage("Adding item to the cart...");
      response = await addToCartHelper({ item, username });
    } else if (action === "decrease") {
      setMessage("Reducing item from the cart");
      response = await reduceItemHelper({ item, username });
    } else if (action === "remove") {
      setMessage("Removing item from the cart");
      
    } else {
      return;
    }

    if (response.ok) {
      router.replace("/cart");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
            <p
              className={styles.quantityControl}
              onClick={() => clickHandler("decrease")}
            >
              -
            </p>
            <p>{item.quantity}</p>
            <p
              className={styles.quantityControl}
              onClick={() => clickHandler("increase")}
            >
              +
            </p>
          </div>
          <ImBin2
            className={styles.delete}
            onClick={() => clickHandler("remove")}
          />
        </div>
      </div>
    </>
  );
};

export default CartItem;
