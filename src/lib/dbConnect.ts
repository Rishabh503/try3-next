import mongoose from "mongoose";

type ConnectionObject={
    isConnected:Number
}

const connection: ConnectionObject={}
const DBNAME="/AUTH-NEXT-CHAI-2"
export async function dbConnect():Promise<void>{
        const name=process.env.MONGO_DB_URI+DBNAME
    if(connection.isConnected){
        console.log("already connected to a databsase")
    }

    try {
       const db= await mongoose.connect(name!)
       connection.isConnected=db.connections[0].readyState
       console.log("Db is connected Succefully")
    } catch (error) {
        console.log("database nhi juda",error)
        process.exit
    }
}