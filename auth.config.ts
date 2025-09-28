import type { NextAuthOptions } from "next-auth";

// TODO: Configure Auth.js providers (e.g., email magic links) once credentials are available.
export const authOptions: NextAuthOptions = {
  providers: [],
  session: {
    strategy: "jwt",
  },
};
