import React from "react";
import styles from "./Modal.module.css";
import { BarLoader, ClipLoader, GridLoader, HashLoader } from "react-spinners";

const Modal = (props) => {
  return (
    <>
      <div className={styles.modalBg} />
      <div className={styles.modalContent}>
        {props.children}
        <BarLoader />
      </div>
    </>
  );
};

export default Modal;
