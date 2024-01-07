import { connectDatabase, usersCollection } from "@/lib/db";

const handler = async (req, res) => {
  const username = req.query.username;

  const client = await connectDatabase();

  const users = await usersCollection(client);

  const user = await users.findOne({ _id: username });

  const totalItems = await user.cart.totalItems;

  client.close();

  return res.status(200).json({ totalItems });
};

export default handler;
