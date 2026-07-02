const mongoose=require("mongoose")





// schema write 

const musicSchema= new mongoose.Schema({
    uri:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    }

})




// model create

const musicModel=mongoose.model("music",musicSchema)




// exports model
module.exports=musicModel