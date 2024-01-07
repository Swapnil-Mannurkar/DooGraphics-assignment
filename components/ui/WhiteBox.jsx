import React from "react";
import styles from "./WhiteBox.module.css";

const WhiteBox = (props) => {
  return (
    <main className={styles.main}>
      <h1>{props.title}</h1>
      <div className={styles.cart}>{props.children}</div>
    </main>
  );
};

export default WhiteBox;
