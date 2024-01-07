import { getServerSession } from "next-auth";
import React from "react";
import Cart from "@/components/cart/Cart";
import { authOptions } from "../api/auth/[...nextauth]";
import { connectDatabase, usersCollection } from "@/lib/db";

const CartPage = ({ cart }) => {
  return <Cart cart={cart} />;
};

export default CartPage;

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

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
