const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ConnectToDb = require('./connect')
const router = require('./routes')
const cors = require('cors')
const PORT = 4001

if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

ConnectToDb()

app.use(express.json())
app.use('/user', router)
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  

app.listen(process.env.PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})