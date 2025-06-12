import {z} from 'zod'

export const usernameValidation=z
        .string()
        .min(2,"Username myst be atleast 2 chars")
        .max(10,"username must be no more than 20 chars")
// jo frontend se signup ka data ayega hum use check krte ha 
// to signup me kya kya ayega bolo
//  username email pass ayega haina 
//  to humne 2 tarike sikhe 
    // ek to ye ki sirf ek kko kese krna hai and
    //  ek ki ye teeno ko sath kese krna hai 
    //aise hi sbke banane hai 

export const signUpSchema=z.object({
    username:usernameValidation,
    email:z.string().email({message:"invalid email adress"}),
    password:z.string().min(6,{message:"password must be min 6 char"})
})