import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://startupforge-server-5pdk.vercel.app",
});