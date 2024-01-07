import React from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Link from "next/link";
import WhiteBox from "../ui/WhiteBox";

const Cart = ({ cart }) => {
  if (cart.items.length === 0) {
    return (
      <WhiteBox title={"CART"}>
        <h2>No items added to the cart!</h2>
        <button>
          <Link href={"/"}>EXPLORE PRODUCTS</Link>
        </button>
      </WhiteBox>
    );
  }

  return (
    <WhiteBox title={"CART"}>
      <div className={styles.cartDetails}>
        <div className={styles.cartHeading}>
          <h3>Item</h3>
          <h3>Quantity</h3>
          <h3>Delete</h3>
        </div>
        {cart.items.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
      <div className={styles.checkout}>
        <h4>
          TOTAL ITEMS:{" "}
          <span className={styles.totalPrice}>{cart.totalItems}</span>
        </h4>
        <h4>
          TOTAL PRICE:{" "}
          <span className={styles.totalPrice}>
            ${cart.totalPrice.toFixed(2)}
          </span>
        </h4>
        <button>
          <Link href={"/checkout"}>CHECKOUT</Link>
        </button>
      </div>
    </WhiteBox>
  );
};

export default Cart;
