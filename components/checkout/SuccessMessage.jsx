import React from "react";
import styles from "./SuccessMessage.module.css";
import { FaCircleCheck } from "react-icons/fa6";

const SuccessMessage = (props) => {
  return (
    <div className={styles.success}>
      <h2>Order placed successfully!</h2>
      <FaCircleCheck className={styles.icon} />
      <button onClick={props.closeMessage}>Look for more products</button>
    </div>
  );
};

export default SuccessMessage;
