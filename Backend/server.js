import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import express from "express";

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

app.get('/',(req,res)=>{
    res.send("Welcome to uber ");
})
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
    
})