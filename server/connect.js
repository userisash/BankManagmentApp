const mongoose = require("mongoose");


if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

async function ConnectToDb(){
    try{
        await mongoose.connect(process.env.DB_URL,{
            useNewUrlParser: true,
        })
        console.log('connected to data successfully');
    }catch(err){
        console.log(err)
    }
}

module.exports = ConnectToDb;