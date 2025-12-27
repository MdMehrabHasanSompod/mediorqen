import mongoose from "mongoose";


const connectDB = async():Promise<void> => {
    const mongodbUri = process.env.MONGODB_URI as string
   try {
    if(!mongodbUri){
        throw new Error("Database credentials undefined")
    }
    if(mongoose.connection.readyState===1){
        if(process.env.NODE_ENV !== "production"){
        console.warn("Database already connected");
        }
        return;
    }
    if(mongoose.connection.readyState===2){
        if(process.env.NODE_ENV !== "production"){
        console.log("Database connection in progress");
        }
        return;
    }
    await mongoose.connect(mongodbUri)
    if(process.env.NODE_ENV !== "production"){
        console.log("Database Connected Successfully");
    }
    
   } catch (error) {
     console.error(`Database Connection Error: ${error}`);
   }
}

export default connectDB;