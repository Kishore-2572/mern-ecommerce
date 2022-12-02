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

const port=process.env.PORT
app.listen(port, () => console.log(`Backend is running at http://localhost:${port}`))