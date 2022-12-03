const express = require('express');
const app = express();
const dotenv = require('dotenv');
const data = require('./data.js');
const mongoose = require('mongoose');
const seedRouter=require('./routes/seedRoutes')
const productRoutes=require('./routes/productRoutes')
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use('/api/seed',seedRouter);
app.use('/api/products',productRoutes);



const port = process.env.PORT;
app.listen(port, () =>
  console.log(`Backend is running at http://localhost:${port}`)
);
