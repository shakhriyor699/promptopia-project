import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connect } from '@/utils/database'
import User from '@/models/user'

interface SessionOptions { 
  session: {
    user: { id: string, email: string };
  };
}

declare let process: {
  env: {
    GOOGLE_ID: string
    GOOGLE_CLIENT_SECRET: string
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    // @ts-ignore
    async session({ session }: SessionOptions) {
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser?._id.toString()
      return session
    },
    async signIn({ profile }: any) {
      try {
        await connect()

        const userExist = await User.findOne({ email: profile.email })
        
        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.pucture
          })
        }

        return true
      } catch (error) {
        console.log(error);
        return false
      }
    }
  }
})

export { handler as GET, handler as POST }