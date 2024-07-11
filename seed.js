const mongoose=require('mongoose');
const Product=require("./models/Product")
const products=[
    {
        name:'iphone 12',
        img:"https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fHww",
        price:300,
        
        des:"iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system"
    },
    {
        name:'Nike',
        img:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWRpZGFzJTIwc2hvZXMlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
        price:100,
        des:"iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system"
    },
    {
        name:'spectacle',
        img:"https://images.unsplash.com/photo-1483412468200-72182dbbc544?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3BlY3RhY2xlc3xlbnwwfHwwfHx8MA%3D%3D",
        price:200,
        des:"iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system"
    },
    {
        name:'drone',
        img:"https://images.unsplash.com/photo-1521405924368-64c5b84bec60?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        price:600,
        des:"iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system"
    },
    {
        name:'Bicycle',
        img:"https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmljeWNsZXxlbnwwfHwwfHx8MA%3D%3D",
        price:500,
        des:"iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system"
    },
    {
        name:'Teddy',
        img:"https://images.unsplash.com/photo-1562040506-a9b32cb51b94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVkZHklMjBiZWFyfGVufDB8fDB8fHww",
        price:50,
        des:"iPhone is a line of smartphones produced by Apple Inc. that use Apple's own iOS mobile operating system"
    }
]
async function seed(){
    // await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("data seeded");
}
module.exports=seed;