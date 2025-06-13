import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerification } from "@/helpers/sendVerificationEmail";




export async function POST(request:Request){
    await dbConnect()
    try {
        const {username,email,password}=await request.json()
        const exisitingUserVerifiedByUsername=await UserModel.findOne({
            username,
            isVerified:true
        })

        if(exisitingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message:"username already exisits take a new username"
            },{status:400})
        }

        const existingUserByEmail=await UserModel.findOne({email})
        const verifyCode=Math.floor(100000+Math.random()*900000).toString()
        if(existingUserByEmail){
            true //TODO
        }else{
            const hashedPassword=await bcrypt.hash(password,10)
            const expiryDate=new Date()
            expiryDate.setHours(expiryDate.getHours()+1)

          const newUser=  new UserModel({
                username,
                email,
                password:hashedPassword,
                verifyCode:verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false,
                isAcceptingMessage:true,
                messages:[]
            })

            await newUser.save()

            //send verigy email

            const emailResponse=await sendVerification(
                email,username,verifyCode
            )

            if(!emailResponse.success){
                return Response.json({
                    success:false,
                    message:emailResponse.mesage
                },
                {status:500}
            )
            }

            return Response.json({
                success:true,
                message:"User registered Sucesfullu please verify the email now"
            },
            {
                status:201
            }
        )
        }


    } catch (error) {
        console.error("error registering users")
        return Response.json({
            success:false,
            message:"erro registering user"
        },
        {
            status:500
        }
    )
    }
}