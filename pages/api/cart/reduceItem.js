import { connectDatabase, usersCollection } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return res
      .status(403)
      .json({ message: "Invalid request!", status: "failed" });
  }

  const product = req.body.product;
  const username = req.body.username;

  let client;

  try {
    client = await connectDatabase();

    const users = await usersCollection(client);

    const user = await users.findOne({ _id: username });

    const cart = await user.cart;

    const itemIndex = await cart.items.findIndex(
      (item) => item.id === product.id
    );

    product.quantity -= 1;
    cart.totalPrice = Number(cart.totalPrice) - Number(product.price);
    cart.totalItems = Number(cart.totalItems) - 1;

    if (product.quantity === 0) {
      cart.items = cart.items.filter((item) => item.id !== product.id);

      await users.updateOne({ _id: username }, { $set: { cart: cart } });
    } else {
      cart.items[itemIndex] = product;

      await users.updateOne({ _id: username }, { $set: { cart: cart } });
    }

    client.close();

    return res
      .status(200)
      .json({ message: "Item updated successfully!", status: "success" });
  } catch (err) {
    if (client) {
      client.close();
    }

    return res
      .status(422)
      .json({ message: "Something went wrong!", status: "failed" });
  }
};

export default handler;
