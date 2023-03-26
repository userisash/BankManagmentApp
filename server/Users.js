const mongoose = require('mongoose')
const uniqid = require('uniqid');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        // required: [true, "print name here"],
    },
    email: {
        type: String,
        required: [true, "print email here"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "print password here"],
    },
    Usertype: {
        type: String,
        // required: [true, "assign user type here"],
        default: "user"
    },
    cash: {
        type: Number,
        // required: [true, "cash"],
        default: 0
    },
    credit: {
        type: Number,
        // required: [true, "credit "],
        default: 0
    },
    passportId: {
        type: String,
        // required: [true, "please add passport Id "],
        unique: true,
        default:uniqid()
    }
})



const UserModel = new mongoose.model("users", UserSchema)

module.exports = UserModel