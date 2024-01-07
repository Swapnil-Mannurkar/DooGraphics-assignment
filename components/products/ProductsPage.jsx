import React, { useState } from "react";
import styles from "./ProductsPage.module.css";
import Product from "./Product";
import Modal from "../ui/Modal";

const ProductsPage = ({ products }) => {
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoadingHandler = (value) => {
    setIsLoading(value);
  };

  return (
    <>
      {isLoading && (
        <Modal>
          <h4>Adding item to cart...</h4>
        </Modal>
      )}
      <main className={styles.products}>
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            toggleLoading={toggleLoadingHandler}
          />
        ))}
      </main>
    </>
  );
};

export default ProductsPage;
