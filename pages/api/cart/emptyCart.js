import { connectDatabase, usersCollection } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method !== "DELETE") {
    return res
      .status(422)
      .json({ message: "Invalid request", status: "failed" });
  }

  const username = req.body.username;

  try {
    const client = await connectDatabase();

    const users = await usersCollection(client);

    const user = await users.findOne({ _id: username });

    const cart = await user.cart;

    cart.items = [];
    cart.totalPrice = 0;
    cart.totalItems = 0;

    await users.updateOne({ _id: username }, { $set: { cart: cart } });

    return res
      .status(200)
      .json({ message: "Order place successfully!", status: "success" });
  } catch (err) {
    return res
      .status(422)
      .json({ message: "Something went wrong!", status: "failed" });
  }
};

export default handler;
