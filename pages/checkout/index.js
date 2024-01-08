import Checkout from "@/components/checkout/Checkout";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import Head from "next/head";

const CheckoutPage = () => {
  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="description" content="Enter your order details!" />
      </Head>
      <Checkout />
    </>
  );
};

export default CheckoutPage;

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
