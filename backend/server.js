const express = require('express');
const app = express();
const dotenv = require('dotenv');
const data = require('./data.js');
const mongoose = require('mongoose');
const seedRouter=require('./routes/seedRoutes')
const productRoutes=require('./routes/productRoutes')
const userRoutes=require('./routes/userRoutes')
const orderRoutes=require('./routes/orderRoutes')
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/api/seed',seedRouter);
app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);

app.use((err,req,res,next) => {
    res.status(500).send({message:err.message});
})

const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Backend is running at http://localhost:${port}`)
);
 