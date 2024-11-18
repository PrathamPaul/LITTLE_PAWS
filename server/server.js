const express=require('express');
const mongoose=require('mongoose')
const cookieparser=require('cookie-parser')
const cors=require('cors')
const authrouter= require('./routes/auth/auth-routes')
const adminProductsRouter=require('./routes/admin/products-routes')
const petRouter = require('./routes/allpets')
//require('dotenv').config();
// create database || create a separate file also and import it than
mongoose.connect('mongodb+srv://prsondhi:piyush123@cluster0.a6ms7.mongodb.net/')
.then(()=>{
    console.log("MongoDB connected")
})
.catch((error)=>{
    console.log(error)
})


const app=express();
const PORT=process.env.PORT||5000;

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods:['GET','POST','DELETE','PUT'],
        allowedHeaders:[
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials:true
    })
)

app.use(cookieparser());
app.use(express.json());
app.use("/api/auth",authrouter);
app.use("/api/admin/products",adminProductsRouter);
app.use("/api/pets" , petRouter);
app.listen(PORT,()=>{
    console.log(`Server is now running on port ${PORT}`)
})