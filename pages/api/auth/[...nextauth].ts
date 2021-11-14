import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import Email, { EmailProvider } from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
    Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/check-email",
    newUser: "/profile-type",
  },
  theme: {
    colorScheme: "light",
    logo: "https://i.ibb.co/SKCWB9Y/graduet.png",
  },
  callbacks: {
    async session({ session, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user["is_graduate"] = user.isGraduate;
      console.log("SESSION: ", session, " USER: ", user);
      return session;
    },
  },
});
