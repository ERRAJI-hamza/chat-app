import express from "express";
import { addMessageController, getMessagesController } from "../controllers/messageController.js";


//router object
const router = express.Router();



router.post("/addMessage", addMessageController);

router.post("/getMessages", getMessagesController);

export default router;