import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const auth = betterAuth({
  database: mongodbAdapter(client.db("startupforgeDB")),

  secret: process.env.BETTER_AUTH_SECRET,

  baseURL: "https://startupforge-server-5pdk.vercel.app",

  trustedOrigins: [
    "http://localhost:3000",
    "https://startupforge-client-gamma.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});

export default auth;
