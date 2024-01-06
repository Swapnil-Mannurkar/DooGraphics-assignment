import { connectDatabase, usersCollection } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(403)
      .json({ message: "Invalid request!", status: "failed" });
  }

  const product = req.body;

  if (!product) {
    return res
      .status(422)
      .json({ message: "No product found!", status: "failed" });
  }

};

export default handler;
