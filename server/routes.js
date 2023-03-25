const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./Users')

const router = express.Router()

router.get("/getusers", async (req, res) => {
    try {
        const result = await UserModel.find({});
        res.send(result);
    } catch (err) {
        res.send(err);
    }
})



router.post("/createuser", async (req, res) =>{
    const user = req.body
    const newUser = new UserModel(user)
    try{
    await newUser.save()
    }catch(err){
        res.send(err)
    }
    
    res.send(user)
})

router.put("/updateuser/:name", async (req, res) => {
    const name = req.params.name;
    const userUpdates = req.body;
    try {
        const result = await UserModel.findOneAndUpdate(
            { name: name },
            userUpdates,
            { new: true }
        );
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});





module.exports = router