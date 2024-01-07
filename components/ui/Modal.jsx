import React from "react";
import styles from "./Modal.module.css";
import { BarLoader } from "react-spinners";

const Modal = (props) => {
  return (
    <>
      <div className={styles.modalBg} />
      <div className={styles.modalContent}>
        {props.children}
        {props.type === "success" ? null : <BarLoader />}
      </div>
    </>
  );
};

export default Modal;
