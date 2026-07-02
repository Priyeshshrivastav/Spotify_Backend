const express=require("express")
const userController=require("../controllers/user.controller")


const router=express.Router()



// apis create using router

router.post("/register",userController.registerUser)


// login router
router.post("/login",userController.loginUser)







module.exports=router