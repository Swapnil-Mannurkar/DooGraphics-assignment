import React from "react";
import styles from "./ProductsPage.module.css";
import Product from "./Product";

const ProductsPage = ({ products }) => {
  return (
    <main className={styles.products}>
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </main>
  );
};

export default ProductsPage;
