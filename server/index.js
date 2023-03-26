const express = require("express");//add express
const mongoose = require("mongoose");//add mongoose
const db = require('./connect')
mongoose.set("strictQuery", false);//run mongoose


const app = express();//run express
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const cors = require('cors'); //add cors
const cookieParser = require('cookie-parser');//add cookie-parser
const ConnectToDb = require("./connect");
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
ConnectToDb();


app.use(express.urlencoded({ extended: true }));//know body in sending requst
app.use(express.json());

app.use("/user",require("./routes"));


const start = async () => {
    await mongoose.connect(process.env.DB_URL );
    app.listen(port, () => { console.log(`run in port ${port}`); })
}

start();