import React from "react";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Link from "next/link";

const Cart = ({ cart }) => {
  if (cart.items.length === 0) {
    return (
      <main className={styles.main}>
        <h1>CART</h1>
        <div className={styles.emptyCart}>
          <h2>No items added to the cart!</h2>
          <button>
            <Link href={"/"}>EXPLORE PRODUCTS</Link>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1>CART</h1>
      <div className={styles.cart}>
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
            TOTAL PRICE:{" "}
            <span className={styles.totalPrice}>
              ${cart.totalPrice.toFixed(2)}
            </span>
          </h4>
          <button>CHECKOUT</button>
        </div>
      </div>
    </main>
  );
};

export default Cart;
