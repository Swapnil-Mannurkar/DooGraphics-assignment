import React from "react";
import styles from "./LoadingSpinner.module.css";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <main className={styles.main}>
      <ClipLoader />
    </main>
  );
};

export default Loading;
