const express= require ('express');

 const app= express()

const usermodel= require('./models/adminmodel')
const router= require("./routes/router")
const cookieParser = require('cookie-parser');
const cors=require('cors')
//middelware
// CORS configuration

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,

}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());
app.use("/api",router)




 app.listen(3000,()=>console.log("server is running oon port 3000"))