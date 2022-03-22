import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import conectDB from "./../../../middleware/mongoDB";
import User from "./../../../utils/models/user.model";
const bcrypt = require("bcryptjs");

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        conectDB();

        const user = await User.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("El usuario no existe.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (isPasswordValid) {
          return {
            name: user.username,
            email: user.email,
            userType: user.userType,
            image: user.userProfile,
            createdAt: user.createdAt,
          };
        } else {
          throw new Error("Contraseña incorrecta.");
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      if (token.user) session.user = token.user;
      return session;
    },
  },
  debug: true,
  secret: "klsakdmalksdjasdma93jr029m2039ri2039ruc2m03rcu2m",
});
