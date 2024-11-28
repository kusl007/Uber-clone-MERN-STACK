require('dotenv').config();
const express=require('express');
const app=express();

app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send("Hello world")
})

const PORT=process.env.PORT||4000;
app.listen(PORT,()=>{console.log("Server is running on port ",{PORT})});