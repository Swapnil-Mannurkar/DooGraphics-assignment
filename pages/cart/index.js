import { getServerSession } from "next-auth";
import React from "react";
import Cart from "@/components/cart/Cart";
import { authOptions } from "../api/auth/[...nextauth]";
import { connectDatabase, usersCollection } from "@/lib/db";
import Head from "next/head";

const CartPage = ({ cart }) => {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta
          name="description"
          content="Check your and place your order now!"
        />
      </Head>
      <Cart cart={cart} />
    </>
  );
};

export default CartPage;

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

  try {
    const client = await connectDatabase();

    const users = await usersCollection(client);

    const user = await users.findOne({ _id: session.user.name });

    return {
      props: {
        cart: await user.cart,
      },
    };
  } catch (err) {
    return { props: {} };
  }
};
