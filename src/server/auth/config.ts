import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { dbPool } from "../db/postgres";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}





const requireAuthPage = [
  "/dashboard",
  "/settings",
  "/profile",
  "/account",
  "/admin",
  "/auth"
]

export const authConfig = {
  // adapter: PostgresAdapter(dbPool),
  providers: [
    GitHub(
      {
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        authorization: {params : {scope: "user:email read:user"}},
      }
    ),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    authorized: ({auth, request: {nextUrl}}) => {

      const isAuth = auth?.user;
      const isRequireAuth = requireAuthPage.some((pathUrl) => nextUrl.pathname.startsWith(pathUrl));

      if(!isRequireAuth) {
        return true;
      }
      if(isAuth) {
        return true;
      }
      return Response.redirect(new URL("/login", nextUrl));
    },
    signIn: async ({ user, account, profile, email, credentials }) => {
      const userEmail = user.email || "";
      const isValidEmail = await process.env.ADMIN_EMAILS?.split(",").includes(userEmail);
      if (isValidEmail) {
        return true;
      }
      return false;
    }
  },
} satisfies NextAuthConfig;
