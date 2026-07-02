const userModel=require("../models/user.models")
const jsonwebtoken=require("jsonwebtoken")

const bcrypt=require("bcrypt")
const { response } = require("../app")




// 1st -> register for user 

async function registerUser(req,res){
    // access all data
    const {username,email,password,role}=req.body

    // check user already exists or not
    const isUserAlreadyExists=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]

    })
    if(isUserAlreadyExists){
        return res.status(409).send({message:'User already exists'})
    }

    // pass encryption and decription
    const hash=await bcrypt.hash(password,10) 

    // user create
    const user=await userModel.create({
        username,
        email,
        password:hash,
        role
    })

    // token create
    const token=jsonwebtoken.sign({
        id:user._id,
        role:user.role,
    },process.env.JWT_SECRET)


    // set token into cookie
    res.cookie("token",token)


    res.status(201).send({message:"User created successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            password:user.password,
            role:user.role
        }
    })




} 

// 2nd -> login the user

async function loginUser(req,res){

    // data excess
    const {username,email,password}=req.body;

    //  find data from db
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(401).send({message:"Invalid Credentials"})
    }

    // check pass exists or not  -> dcreption
    const isPasswordValid=await bcrypt.compare(password,user.password)



    // 
    if(!isPasswordValid){
        return res.status(401).send({message:"Invalid credential"}) 
    }

    // token create 
    const token =jsonwebtoken.sign({
        id:user._id,
        role:user.role,
    },process.env.JWT_SECRET)

    res.cookie("token",token)

    // ṣend response

    res.status(200).send({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    }) 





}





module.exports={registerUser,loginUser}