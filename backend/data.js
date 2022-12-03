const bcrypt=require('bcryptjs')
const data ={
    users:[
        {
            name:"kishore",
            email:"kishore@gmail.com",
            password:bcrypt.hashSync('123'),
            isAdmin:true
        },
        {
            name:"jainth",
            email:"jainth@gmail.com",
            password:bcrypt.hashSync('123'),
            isAdmin:false
        },
    ],
    products:[
        {
            name:"Nike Slim shirt",
            slug:"nike-slim-shirt",
            category:"shirt",
            image:"/images/p1.jpeg",
            price:120,
            countInStock:5,
            brand:"Nike",
            rating:4.5,
            numReviews:10,
            description:"High quality Shirt"
        },
        {
            name:"Nike Slim Pant",
            slug:"nike-slim-pant",
            category:"Pant",
            image:"/images/p2.jpeg",
            price:200,
            countInStock:10,
            brand:"Nike",
            rating:4.5,
            numReviews:10,
            description:"High quality Shirt"
        },
        {
            name:"Addidas Fit shirt",
            slug:"Addidas-fit-shirt",
            category:"shirt",
            image:"/images/p3.jpeg",
            price:100,
            countInStock:0,
            brand:"Addidas",
            rating:4.5,
            numReviews:10,
            description:"High quality Shirt"
        },
        {
            name:"Addidas Slim Pant",
            slug:"Addidas-slim-pant",
            category:"shirt",
            image:"/images/p4.jpeg",
            price:500,
            countInStock:10,
            brand:"Addidas",
            rating:4.5,
            numReviews:10,
            description:"High quality Shirt"
        },
    ]

}

module.exports =data;