import { Message } from "@/models/User";


export interface ApiResponse{
    success:boolean;
    mesage:string;
    isAcceptingMessages?:boolean;
    messages?:Array<Message>
}