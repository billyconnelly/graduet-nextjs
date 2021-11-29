import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import Email, { EmailProvider } from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import useSWR from "swr";

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
    async jwt({ token, user }) {
      if (typeof user !== "undefined") {
        token["isGraduate"] = user.isGraduate;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("TOKEN: ", token);
      // session.user["is_graduate"] = token.isGraduate;
      // const fetcher = (...args) => fetch(...args).then((res) => res.json());
      // const { data, error } = useSWR("/api/is-graduate", fetcher);
      // // if (user.isGraduate === undefined) console.log("UNDEFINED AF");
      // // console.log("HERE IT IS: ", user.isGraduate);
      // // Send properties to the client, like an access_token from a provider.
      // // user.isGraduate !== "undefined" &&
      // //   (session.user["is_graduate"] = user.isGraduate);
      // // console.log("SESSION: ", session, " USER: ", user);
      // console.log("SESSION FROM SESSION: ", session);
      return session;
    },
  },
  session: {
    jwt: true,
  },
});
