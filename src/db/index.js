import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const DB_connect = async()=>{
     try {
        const ConnectionInstances =await mongoose.connect(`${process.env.MONGO_DB_URI}/${DB_NAME}`)
        console.log(`Mongo_DB connected || DB_HOST:${ConnectionInstances.connection.host}`);
        //  console.log(ConnectionInstances);
        
        

        
    } catch (error) {
        console.log("Error in Connection MongoDB", error);
        
        
    }

} 
export default DB_connect



