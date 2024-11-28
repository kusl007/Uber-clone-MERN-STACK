const dotenv=require('dotenv');
dotenv.config();

const express=require('express');
const app=express();

const connectToDb=require('./db/db');
connectToDb();

const cors=require('cors');
app.use(cors());

app.use(express.json());


app.get('/',(req,res)=>{
    res.send("Hello world")
})



module.exports=app;