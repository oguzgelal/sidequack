import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { bearer, deviceAuthorization } from "better-auth/plugins";
import { prisma } from "./db.js";

export const TV_CLIENT_ID = "tvai-tv";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    deviceAuthorization({
      verificationUri: "/device",
      validateClient: (clientId) => clientId === TV_CLIENT_ID,
    }),
    bearer(),
  ],
});
