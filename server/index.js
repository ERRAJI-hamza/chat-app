import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import colors from "colors"
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js"
import messageRoute from "./routes/messageRoute.js"

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/user", userRoute);
app.use("/api/chat", messageRoute);

//rest api
app.get('/',(req,res) => {
    res.send({
        message: "bismilah"
    });
});

//port
const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Server runing on ${PORT}`.bgCyan.white);
})