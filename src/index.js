import dotenv from 'dotenv'
dotenv.config()
import DB_connect from './db/index.js'
import app from './app.js';

// console.log("CLOUDINARY_NAME:", process.env.CLOUDINARY_NAME);
// console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
// console.log("CLOUDINARY_SECRET:", process.env.CLOUDINARY_SECRET);

console.log("mongoDB",process.env.MONGO_DB_URI);



DB_connect()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at ${process.env.PORT}`)
        
    })
})


.catch((err)=>{
    console.log("server connection is failed" ,err);
    

})