import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerification(
    email:string,
    username:string,
    verifyCode:string
):Promise<ApiResponse>{
    try {
         await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: email,
    subject: 'Hello world',
    react: VerificationEmail({username,otp:verifyCode}),
  });
        return {success:true,mesage:"success !!  sending verification email"}
    } catch (error) {
        return {success:false,mesage:"failed to send verification email"}
    }
}