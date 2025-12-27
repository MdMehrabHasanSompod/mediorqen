import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDB from "./db"
import { User } from "../models/user.model"
import bcrypt from "bcrypt"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials:{
        email: { label: "Email",type:"email" },
        password: { label: "Password", type: "password" },
        }
    , async authorize(credentials) {
         const email = credentials.email;
         const password = credentials.password as string;
         await connectDB()
         const user = await User.findOne({email}).select("+password")
         if(!user){
             throw new Error("User does not exist")
         }
          const isPasswordMatched = await bcrypt.compare(password,user.password)
         if(!isPasswordMatched){
            throw new Error("Invalid credentials")
                }

            return {
                id: user._id.toString(),
                email:user.email,
                name: user.name,
                role: user.role,
            }
            
      },
    }),
    Google({
      clientId : process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async signIn({user,account}){
       if(account?.provider==="google"){
         await connectDB()
         let ExistedUser = await User.findOne({email:user.email})
         if(!ExistedUser){
           ExistedUser = await User.create({
          name: user.name,
          email: user.email,
          avatar: user.image
         })
         }
        user.role=ExistedUser.role;
        user.id = ExistedUser._id.toString();
       }
       return true
    },
     

  jwt({ token, user }) {
    if (user) {
      token.id = user.id
      token.email = user.email
      token.name = user.name
      token.role = user.role
    }
    return token
  },

  session({ session, token }) {
    if (session.user) {
      session.user.id = token.id as string
      session.user.email = token.email as string
      session.user.name = token.name as string
      session.user.role = token.role as string
    }
    return session
  },
},

  pages:{
    signIn:"/login",
    error:"/login",
  },
  session:{
    strategy:"jwt",
    maxAge: 604800
  },
  secret: process.env.AUTH_SECRET
})

