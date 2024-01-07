import { connectDatabase, usersCollection } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(403)
      .json({ message: "Invalid request!", status: "failed" });
  }

  const product = req.body.product;
  const username = req.body.username;

  try {
    const client = await connectDatabase();

    const users = await usersCollection(client);

    const user = await users.findOne({ _id: username });

    const cart = await user.cart;

    cart.totalPrice = (
      Number(cart.totalPrice) -
      Number(product.price) * Number(product.quantity)
    ).toFixed(2);

    cart.totalPrice = Number(cart.totalPrice);

    cart.totalItems = Number(cart.totalItems) - Number(product.quantity);

    cart.items = cart.items.filter((item) => item.id !== product.id);

    await users.updateOne({ _id: username }, { $set: { cart: cart } });

    return res
      .status(200)
      .json({ message: "Item updated successfully!", status: "success" });
  } catch (err) {
    return res
      .status(422)
      .json({ message: "Something went wrong!", status: "failed" });
  }
};

export default handler;
