import React from "react";
import Head from "next/head";
import { getAllProducts } from "../lib/products";
import ProductsPage from "@/components/products/ProductsPage";

const HomePage = ({ products }) => {
  return (
    <>
      <Head>
        <title>E-Commerce</title>
        <meta name="description" content="Online shopping!" />
      </Head>
      <ProductsPage products={products} />
    </>
  );
};

export const getServerSideProps = async () => {
  const products = await getAllProducts();
  return { props: { products } };
};

export default HomePage;
