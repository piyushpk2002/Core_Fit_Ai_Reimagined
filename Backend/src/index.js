import connectDB from "./lib/db.js";
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"


dotenv.config();

const app = express();

//middlewares
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(4000, () => {

    connectDB();
    console.log(`Server connection established to http://localhost:${4000}`);
    
})



