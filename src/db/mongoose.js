import Mongoose from "mongoose";

const connetDB=async()=>{
try {
    const connet=await Mongoose.connect(process.env.MONGO_URL);
    console.log(`connection sucessfull on ${Mongoose.connection.host}`);
} catch (error) {
    console.log(error);
}
}
export default connetDB