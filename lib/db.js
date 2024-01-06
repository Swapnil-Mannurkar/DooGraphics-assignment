import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://Mannurkar:Swapnil2001@doographics-assignment.nulptc7.mongodb.net/?retryWrites=true&w=majority"
  );
};

export const usersCollection = async (client) => {
  return await client.db("shop").collection("users");
};
