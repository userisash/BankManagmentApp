const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
        }, 
    username:{
        type:String,
        required: true
    },
    passportId:{
        type:Number,
        required:true,
        default:0
    },
    cash:{
        type:Number,
        required:true,
        default:0
    },
    credits:{
        type:Number,
        required:true,
        default:0
    }
})

const UserModel = new mongoose.model("users", UserSchema)

module.exports = UserModel