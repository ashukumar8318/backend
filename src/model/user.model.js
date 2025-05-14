import mongoose, { model } from "mongoose";
import  {Schema} from "mongoose";
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
    Password: {
        type:String,
        required:true,
    },
    FullName : {
        type: String,
        require:true,
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
    }
    


},{
    timesstamps:true,
})
// to make password encrypted
userSchema.pre('save',function(next){
    if(!this.Password.ismodified) return 
    this.Password=bcrypt.hash(this.Password,16)
    next()
})

// to check is paswword is same with encrypted paswword or not means compare
//you can make as many as method by using method function
//bcrypt can compare the paswword also by using compare method


userSchema.method.isPasswordCorrect = async function(Password){
    return await bcrypt.compare('Password',this.Password)
}

userSchema.method.generateAccessToken = function(){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            Username:this.usename,
            FullName:this.FullName

        },
        process.env.ACESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACESS_TOKEN_EXPIRY

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
