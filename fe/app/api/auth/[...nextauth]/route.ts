import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.CLIENT_ID ?? "",
			clientSecret: process.env.CLIENT_SECRET ?? "",
		}),
	],
	secret: process.env.NEXT_SECRET,
	callbacks:{
		async signIn({ user, account, profile, email, credentials }) {
			return "/input"
		  },
		
	}
});

export { handler as GET, handler as POST };
