const mongoose=require("mongoose")



// mongoose  schema 

   const userSchema= new mongoose.Schema({
           username:{
            type:String,
            require:true,
            unique:true
           },
           email:{
            type:String,
            unique:true,
            require:true
           },
           password:{
            type:String,
            require:true
           },
           role:{
            type:String,
            enum:['user','artist'],
            default:'user'
           }

    })



// model create 


const userModel=mongoose.model("user", userSchema)



module.exports=userModel

