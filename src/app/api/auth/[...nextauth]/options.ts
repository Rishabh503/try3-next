import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
            //email credentials.identifer se milega
            //password credentials.password se
            // yaha sara khel ye credentials ka ha
          });
          if (!user) {
            throw new Error("no userfound with these details");
          }
          if (!user.isVerified) {
            throw new Error("please verify your account");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return user; // jab sb check ho jaye to sidha ye user dedo
          }else{
            throw new Error("incorrect hai re password")
          }
        } catch (error: any) {
          // console.error("error in authorizing") cant do here
          throw new Error(error);
        }
      },
    }),
  ],
  //callbacks from doc
  // yaha hum modify krege ki yaha se hi sara data lele
  callbacks:{
    async session({ session, token,  }) {
      if(token){
          session.user._id=token._id,
        session.user.isVerified=token.isVerified,
        session.user.isAcceptingMessages=token.isAcceptingMessages,
        session.user.username=token.username;
      }

      return session
    },
    async jwt({ token, user }) {
        if(user){
            token._id=user._id?.toString(),
            token.isVerified=user.isVerified,
            token.isAcceptingMessages=user.isAcceptingMessages
            token.username=user.username
        }
        
      return token
    }
  },

  //see from docs
  //ye page bhi bana dega sala
  pages:{
        signIn:'/sign-in'
  },
  session:{
    strategy:"jwt"
  },
  secret:process.env.NEXT_AUTH_SECRET
  

};
