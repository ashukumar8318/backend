import dotenv from 'dotenv'
import DB_connect from './db/index.js'
import app from './app.js';

dotenv.config({
    path: './.env'
})

DB_connect()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running at ${process.env.PORT}`)
        
    })
})


.catch((err)=>{
    console.log("server connection is failed" ,err);
    

})