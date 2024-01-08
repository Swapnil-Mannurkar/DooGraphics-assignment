import React, { useEffect, useState } from "react";
import styles from "./ProductsPage.module.css";
import Product from "./Product";
import Modal from "../ui/Modal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useRouter } from "next/router";

const ProductsPage = ({ products }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.id <= currentPage * 4 &&
          product.id >= (currentPage - 1) * 4 + 1
      )
    );
  }, [currentPage]);

  useEffect(() => {
    router.push(`?page=${currentPage}`);
  }, [currentPage]);

  const toggleLoadingHandler = (value) => {
    setIsLoading(value);
  };

  const changeHandler = (event) => {
    setCurrentPage(event.target.value);
  };

  const previousPageHandler = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPageHandler = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      {isLoading && (
        <Modal>
          <h4>Adding item to cart...</h4>
        </Modal>
      )}
      <main className={styles.products}>
        {filteredProducts.map((product) => (
          <Product
            product={product}
            key={product.id}
            toggleLoading={toggleLoadingHandler}
          />
        ))}
      </main>
      <nav className={styles.pagination}>
        <ul>
          <button disabled={currentPage === 1} onClick={previousPageHandler}>
            <FaArrowLeft />
          </button>
          <li
            value={1}
            onClick={changeHandler}
            className={currentPage === 1 ? styles.active : null}
          >
            1
          </li>
          <li
            value={2}
            onClick={changeHandler}
            className={currentPage === 2 ? styles.active : null}
          >
            2
          </li>
          <li
            value={3}
            onClick={changeHandler}
            className={currentPage === 3 ? styles.active : null}
          >
            3
          </li>
          <li
            value={4}
            onClick={changeHandler}
            className={currentPage === 4 ? styles.active : null}
          >
            4
          </li>
          <li
            value={5}
            onClick={changeHandler}
            className={currentPage === 5 ? styles.active : null}
          >
            5
          </li>
          <button disabled={currentPage === 5} onClick={nextPageHandler}>
            <FaArrowRight />
          </button>
        </ul>
      </nav>
    </>
  );
};

export default ProductsPage;
