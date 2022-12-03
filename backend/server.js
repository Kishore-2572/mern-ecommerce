const express = require('express')
const app = express()
const dotenv=require('dotenv')
const data=require('./data.js')
dotenv.config()

app.use(express.json())
app.get('/', (req, res) =>{
    res.send("Hello")
})

app.get('/api/products', (req, res) =>{
    res.send(data.products)
})

app.get('/api/products/slug/:slug', (req, res) =>{
    const product=data.products.find(x => x.slug===req.params.slug);
    if(product){
        res.send(product);
    }else{
        res.status(400).send({message:'Product not found'});
    }
    
})

app.get('/api/products/:id', (req, res) =>{
    const product=data.products.find(x => x._id===req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(400).send({message:'Product not found'});
    }
    
})

const port=process.env.PORT
app.listen(port, () => console.log(`Backend is running at http://localhost:${port}`))