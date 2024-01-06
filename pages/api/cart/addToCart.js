import { connectDatabase, usersCollection } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(403)
      .json({ message: "Invalid request!", status: "failed" });
  }

  const product = req.body.product;
  const username = req.body.username;

  if (!product) {
    return res
      .status(422)
      .json({ message: "No product found!", status: "failed" });
  }

  try {
    const client = await connectDatabase();

    const users = await usersCollection(client);

    const user = await users.findOne({ _id: username });

    let cart = await user.cart;
    cart.totalPrice += Number(product.price);

    const existingProductIndex = await cart.items.findIndex(
      (prod) => prod.id === product.id
    );

    if (existingProductIndex >= 0) {
      cart.items[existingProductIndex].quantity += 1;

      await users.updateOne({ _id: username }, { $set: { cart: { ...cart } } });
    } else {
      cart.items.push(product);

      await users.updateOne({ _id: username }, { $set: { cart: { ...cart } } });
    }

    return res
      .status(200)
      .json({ message: "Product added to cart!", status: "success" });
  } catch (err) {
    return res
      .status(422)
      .json({ message: "Something went wrong!", status: "failed" });
  }
};

export default handler;
