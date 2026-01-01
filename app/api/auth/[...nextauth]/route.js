import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/Models/User";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      await mongoose.connect(process.env.MONGO_URI);

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        const newUser = new User({
          name: user.name,
          email: user.email,
          username: user.email.split("@")[0],
        });
        await newUser.save();
        user.username = newUser.username;
      } else {
        user.username = existingUser.username;
      }

      return true;
    },

    async jwt({ token, user }) {

      const dbUser = await User.findOne({email:token.email})
      if (dbUser) {
        token.username = dbUser.username;
        token.name = dbUser.name;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.username = token.username;
      session.user.name = token.name;
      return session;
    },
  },
};

// MUST export GET and POST handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
