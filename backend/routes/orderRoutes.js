const express = require('express');
const Order = require('../modals/orderModal');
const bcrypt=require('bcryptjs');
const expressAsyncHandler=require('express-async-handler');
const {isAuth}  = require('../util');

const orderRouter = express.Router();


orderRouter.post('/',isAuth,expressAsyncHandler(async (req,res) => {
    const newOrder=new Order({
        orderItems:req.body.orderItems.map((x) => ({...x,product:x._id})),
        shippingAddress:req.body.shippingAddress,
        paymentMethod:req.body.paymentMethod,
        itemsPrice:req.body.itemsPrice,
        shippingPrice:req.body.shippingPrice,
        taxPrice:req.body.taxPrice,
        totalPrice:req.body.totalPrice,
        user:req.user._id,
    })
    const order=await newOrder.save();
    res.status(201).send({message:"New order created",order});
}))


orderRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

module.exports = orderRouter;
