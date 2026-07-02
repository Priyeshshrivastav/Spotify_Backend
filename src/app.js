const cookieParser = require("cookie-parser")
const express=require("express")

const authRouter=require("./routers/user.router")

const musicRouter=require("./routers/music.routes")



const app=express()


// middleware
app.use(express.json())
app.use(cookieParser())



// apis -> 

app.use("/api/auth",authRouter)

// 2nd api
app.use("/api/music",musicRouter)














module.exports=app