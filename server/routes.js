const { json } = require('express');
const express = require('express')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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



router.post("/", async (req, res) =>{
    debugger
    const user = req.body
    const newUser = new UserModel(user)
    try{
    await newUser.save()
    }catch(err){
        res.send(err)
    }
    res.send(JSON.stringify(newUser))
})

router.put("/user/:id", async (req, res) => {
    const id = req.params.id;
    const userUpdates = req.body;
    console.log('id:', id);
    console.log('userUpdates:', userUpdates);
    try {
        const result = await UserModel.findOneAndUpdate(
            { _id: ObjectId(id) },
            userUpdates,
            { new: true, select: 'password email' }
        );
        console.log('result:', result);
        res.send(JSON.stringify(result));
    } catch (err) {
        res.send(err);
    }
});



router.delete("/deleteuser/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await UserModel.deleteOne( { _id: ObjectId(id) },);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  });
  





module.exports = router