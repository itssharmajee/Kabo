import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import express from "express";
import { dbConn } from "./database/mongoConn.js";
import { router } from "./routes/user.routes.js";
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use(cookieParser());
app.use('/api',router);



dbConn(process.env.DB_URL).then(()=>{
    console.log('db connected successfully');
    app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})
}).catch((err)=>{
    console.log('Having an error'+err);
})

app.get('/',(req,res)=>{
    res.send("Welcome to uber Ballu");
})

