const express = require('express');
const User = require('../modals/userModal');
const bcrypt=require('bcryptjs');
const expressAsyncHandler=require('express-async-handler');
const generateToken  = require('../util');

const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user=await User.findOne({email:req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message:"Invalid Email or Password"});
  })
);

module.exports = userRouter;
