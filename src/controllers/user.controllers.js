 import { asyncHandler } from "../utils/asynchandlers.js";
 import {ApiError} from "../utils/apierrors.js"
 import {User} from "../model/user.model.js"
 import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiresponse.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"


 const registerUser = asyncHandler(async(req,res)=>{
   // take user details from frontend
   //check validate like no boxes should be empty
   //check user is not alredy existing
   //check for images, check for avatar
   //upload them to cloudinary
   //check all of that is uploaded to clodinary or not
   //create user object - create entry in db
   //remove password and refresh token feild from response
   //check whetehr user is created or not
   //return the responce

// 1st step
   // taking req from JSON file 
   //to recive any detail from frontend use req.body() for form and json 
   //but for url it has diffrent technique

   console.log("register");
   

   const{Username,Email,password,FullName }=req.body
   console.log("body:",req.body);

   //for file handling go to routes and inject the middleware

   //2nd step all fields are required

   if(Username===""){
    throw new ApiError(404,"Username is required")
   }
   else if(Email === ""){
    throw new ApiError(404,"Email is required")
   }
   else if(password === ""){
    throw new ApiError(404, "Password is required")
   }
   else if(FullName === ""){
    throw new ApiError(404,"Fullname is required")
   }

   //3rd step check user is not already exist 

   const existedUser = await User.findOne({
    $or:[{Username},{Email}]
    
   })
   console.log(existedUser);
   

   if(existedUser){
    throw new ApiError(409,"Username or Email already exist")
   }

   //4th step upload image and avatar on local 

   const avatarLocalPath=  req.files?.avatar?.[0]?.path
   console.log(req.files);
   console.log(req.path);
   
   
   const coverImageLocalPath =  req.files?.coverImage?.[0]?.path
    //  let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }

    // console.log("avatarlocalpath",avatarLocalPath);
    // console.log("coverimagelocalpath",coverImageLocalPath);
    
    

   if(!avatarLocalPath){
    console.log(404,"Avatar image is required");
    
   }
   

   //5th step upload on cloudinnary

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  // console.log("avatarcloudinary",avatar);
  // console.log("coverimagecloudinary",coverImage);
  
  if(!avatar){
    throw new ApiError(404,"image not uploaded on cloudinary")
  }

  //6ths step  create user object entry in database by create method
  console.log("creating User it might take some time");
  let user
  try{
   user= await User.create({
    Email,
    Username: Username.toLowerCase(),
    password:password,
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
    FullName
    
  })
  console.log("user",user);
}
  catch(err){
    console.log("mongodb err",err);
    throw new ApiError(500, "DB error: " + err.message);
    
  }
  
  

  //7th step to remove paswword and refresh token 

   const createdUser= await User.findById(user._id).select("-password -refreshToken")

   if(!createdUser){
    throw new ApiError(500,"something went wrong")
   }

   return  res.status(201).json(
    new ApiResponse(200,createdUser,"User registered succefully")
   )
 
 })

 const loginUser = asyncHandler(async(req,res)=>{
  //take username or emaill and password from body
  //check username or email is correct or not
  //get access token and refresh token
  //send cookies
  //

//take email username and password from body
  const{Email,Username,password}=req.body
// u can take any one to login is that username or email depend upon u
  if(!Username || !Email){
    throw new ApiError(404,"Username or Email is required")
  }
//after getting user name or email check one of these are present in database or not by folooowing method
   const checklogin = await User.findOne({
    $or:[{Username},{Email}]
  })

  if(!checklogin){
    throw new ApiError(404,"Username or Email is incorrect")
  }

 const checkPassword = await User.findOne({password})

 if(!checkPassword){
  throw new ApiError(404,"Password is incorrect")
 }





 

 })

export {loginUser}
 export {registerUser}
