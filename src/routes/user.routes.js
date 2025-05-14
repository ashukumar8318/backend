import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/Multer.middlewares.js";
import { ApiResponse } from "../utils/apiresponse.js";


const router = Router()

router.route("/register").post(
    //for using to upload file always inject middleware like this only
    upload.fields([
        {
            name : "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount:1,


        }

    ]),
    registerUser)


export default router