import mongoose, { Query } from 'mongoose'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import { User } from '../../models/User'

interface UserQuery extends Query<any, any, {}, any, 'findOne'> {
  password?: string
}

const handler = NextAuth({
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'yourEmail@email.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined
      ) {
        const email = credentials?.email
        const password = credentials?.password
        mongoose.connect(process.env.MONGO as string)
        const user: UserQuery = await User.findOne({ email })
        const passwordOk =
          user &&
          bcrypt.compareSync(password as string, user?.password as string)

        if (!passwordOk) {
          return null
        }

        return user
      },
    }),
  ],
})

export { handler as GET, handler as POST }
