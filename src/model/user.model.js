import mongoose, { Schema } from "mongoose";
//import  {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


const userSchema = new Schema({

    Username : {
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
    },
    Email : {
        type:String,
        required:true,
        unique:true,
        lowercase:true,

    },
    password: {
        type:String,
        required:true,
    },
    FullName : {
        type: String,
        required:true,
        index:true,
    },
    wathcHistory :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    refreshToken:{
        type: String,

    },
    avatar :{
        type:String,
    },
    coverImage:{
        type:String,

    }
    


},{
    timestamps:true,
})
// to make password encrypted
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// to check is paswword is same with encrypted paswword or not means compare
//you can make as many as method by using method function
//bcrypt can compare the paswword also by using compare method


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.method.generateAccessToken = function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.Emailmail,
            Username:this.Username,
            FullName:this.FullName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY

        }
    )
}

userSchema.method.generateRefreshToken = function(){
    return jwt.sign(
         {
             _id:this._id,
 
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
             expiresIn:process.env.REFRESH_TOKEN_EXPIRY
 
         }
     )
 }

export const User = mongoose.model("User",userSchema)
