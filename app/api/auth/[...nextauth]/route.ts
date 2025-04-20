import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Testing ke liye basic auth
        // Real implementation mein yahan database check karenge
        if (credentials?.email === "admin@test.com" && credentials?.password === "admin123") {
          return {
            id: "1",
            email: credentials.email,
            name: "Admin User"
          }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt'
  }
})

export { handler as GET, handler as POST } 