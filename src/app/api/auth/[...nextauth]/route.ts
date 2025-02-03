import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Fetch Auth",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "John Doe" },
                email: { label: "Email", type: "email", placeholder: "john@example.com" },
            },
            async authorize(credentials) {
                const res = await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(credentials),
                    credentials: "include",
                });

                if (!res.ok) {
                    throw new Error("Invalid credentials");
                }

                return { name: credentials?.name, email: credentials?.email };
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour session
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
                token.exp = Math.floor(Date.now() / 1000) + 3600; // Expire in 1 hour
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            session.expires = token.exp;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
