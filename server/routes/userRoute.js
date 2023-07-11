import express from "express";
import { registerController ,loginController,avatarController ,
         categoriesController,roomController} from "../controllers/userController.js";


//router object
const router = express.Router();



//Login|| POST
router.post("/login", loginController);

//Lregister|| POST
router.post("/register", registerController);

router.post("/avatar/:id", avatarController);

router.post("/categories/:id", categoriesController);

router.post("/room", roomController);

export default router;