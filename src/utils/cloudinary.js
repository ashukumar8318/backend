import v2 from 'cloudinary'
import fs from 'fs'

import { v2 as cloudinary } from 'cloudinary';



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET 
    });


    const uploadImage = async(localFilepath)=>{
        try {
            if(!localFilepath)return
          const link= await cloudinary.uploader.upload(localFilepath,{
                resource_type:'auto'
            })
            console.log("file uploaded succefully",link.url);
            return link.url
        } catch (error) {
           fs.unlink(localFilepath) //remove the localy uploaded file as the upload operation got failed
           console.log("uploading failed");
           //return null
           
            
        }
    }

    export {uploadImage}


















    
    