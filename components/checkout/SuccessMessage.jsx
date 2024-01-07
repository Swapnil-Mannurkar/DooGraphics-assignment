import React from "react";
import styles from "./SuccessMessage.module.css";
import { FaCircleCheck } from "react-icons/fa6";
import Link from "next/link";

const SuccessMessage = (props) => {
  return (
    <div className={styles.success}>
      <h2>Success Message</h2>
      <FaCircleCheck className={styles.icon} />
      <button onClick={props.closeMessage}>Look for more products</button>
    </div>
  );
};

export default SuccessMessage;
