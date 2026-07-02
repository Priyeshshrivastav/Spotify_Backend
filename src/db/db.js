const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose=require("mongoose")





async function connectDB(){
    try{
   await mongoose.connect(process.env.MONGO_URL)
    console.log("mongodb is connected")
    }catch(err){
        console.log("mongo db is not connected",err)
    }
}




module.exports=connectDB