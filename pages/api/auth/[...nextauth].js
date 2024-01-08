import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { connectDatabase, usersCollection } from "../../../lib/db";
import { verifyPassword } from "@/lib/auth";

export const authOptions = {
  secret: "thequickbrownfox",
  site: "https://swapnil-mannurkar-doographics.vercel.app/",
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await connectDatabase();

        const collection = await usersCollection(client);

        const user = await collection.findOne({ _id: credentials.username });

        if (!user) {
          client.close();
          throw new Error("User not found!");
        }

        const passwordIsValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!passwordIsValid) {
          client.close();
          throw new Error("Invalid password!");
        }

        client.close();
        return {
          name: user._id,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
