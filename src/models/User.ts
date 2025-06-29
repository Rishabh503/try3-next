import mongoose , {Schema , Document} from "mongoose";

export interface Message extends Document{
    content:string;
    createdAt:Date
}

const MessageSchema:Schema<Message>=new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
})

export interface User extends Document{
    username:string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiry:Date;
    isAcceptingMessage:boolean;
    isVerified:boolean;
    message:Message[]
}

const UserSchema:Schema<User>=new Schema({
    username:{
        type:String,
        required:[true,"Username not found"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email not found"],
        unique:true,
    
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    verifyCode:{
        type:String,
        required:[true,"vrify code is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true,"vrify code is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    message:[
        MessageSchema
    ]

    
})

const UserModel=mongoose.models.User as mongoose.Model<User>  || mongoose.model("User",UserSchema)

export default UserModel;