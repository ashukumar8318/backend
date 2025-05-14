 import { asyncHandler } from "../utils/asynchandlers.js";
 import {ApiError} from "../utils/apierrors.js"
 import {User} from "../model/user.model.js"
 import {uploadImage} from "../utils/cloudinary.js"
 

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
   const{Username,Email,Password,Fullname }=req.body
   console.log("email:",Email);

   //for file handling go to routes and inject the middleware

   //2nd step all fields are required

   if(Username===""){
    throw new ApiError(404,"Username is required")
   }
   else if(Email === ""){
    throw new ApiError(404,"Email is required")
   }
   else if(Password === ""){
    throw new ApiError(404, "Password is required")
   }
   else if(Fullname === ""){
    throw new ApiError(404,"Fullname is required")
   }

   //3rd step check user is not already exist 

   const existedUser = User.find({
    $or:[{Username},{Email}]
    
   })
   if(existedUser){
    throw new ApiError(409,"Username or Email already exist")
   }

   //4th step upload image and avatar on local 

   const avattarLocatpath= req.files?.avatar[0].path
   const coverImagelocalpath = req.files?.coverImage[0].path

   if(!avattarLocatpath){
    console.log(404,"Avatar image is required");
    
   }

   //5th step upload on cloudinnary

  const avatar = await uploadImage(avattarLocatpath)
  const CoverImage = await uploadImage(coverImagelocalpath)

  if(!avatar){
    throw new ApiError(404,"image not uploaded on cloudinary")
  }

  //6ths step  create user object entry in database by create method

  const user= await User.create({
    Email,
    Username: Username.toLowercase(),
    Password,
    avatar:avatar.url,
    coverImage: CoverImageoverimage?.url || "",
    Fullname


  })

  //7th step to remove paswword and refresh token 

   const createdUser= await User.findById(_id).select("-Password -refreshToken")

   if(!createdUser){
    throw new ApiError(500,"something went wrong")
   }



 
 })

 export {registerUser}
