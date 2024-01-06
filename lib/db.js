import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  return await MongoClient.connect(
    "mongodb+srv://Mannurkar:Swapnil2001@doographics-assignment.nulptc7.mongodb.net/?retryWrites=true&w=majority"
  );
};

export const credentialsCollection = async (client) => {
  return await client.db("users").collection("credentials");
};

export const taskCollection = async (client, username) => {
  return await client.db("list-of-events").collection(username);
};
