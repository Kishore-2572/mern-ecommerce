const express=require('express');
const Product = require('../modals/productModal');
const User = require('../modals/userModal');
const data=require('../data');

const router=express.Router();

router.get('/',async (req,res) => {
    await Product.remove({});
    await User.remove({});
    const createdProducts=await Product.insertMany(data.products);
    const createdUsers=await User.insertMany(data.users);
    res.send({createdProducts,createdUsers});
})

module.exports =router;