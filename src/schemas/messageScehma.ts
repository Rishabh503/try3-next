import {z} from 'zod'

export const messaageSchema=z.object(
    {
       content:z.string()
       .min(10,{message:'content must be greater than 10'}).
       max(200,{message:"message must be no longer than 200 words"})
    }
)