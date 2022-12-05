const express = require('express');
const User = require('../modals/userModal');
const bcrypt=require('bcryptjs');
const expressAsyncHandler=require('express-async-handler');
const {isAuth,generateToken}  = require('../util');

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

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser=new User({
      name:req.body.name,
      email:req.body.email,
      password:bcrypt.hashSync(req.body.password)
    });
    const user=await newUser.save();
    res.send({
      _id:user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      token:generateToken(user)
  });
  return;
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

module.exports = userRouter;
