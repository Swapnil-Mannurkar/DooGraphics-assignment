import ProductDetails from "@/components/products/ProductDetails";
import React from "react";
import { getProductById } from "../../lib/products";

const ProductDetailsPage = ({ product }) => {
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;

export const getServerSideProps = async (context) => {
  const id = context.query.prodId;

  const product = await getProductById(id);

  return {
    props: { product },
  };
};
