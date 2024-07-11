const mongoose = require('mongoose');
const Review=require('./Review');
const productSchema=new mongoose.Schema({
   
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true
    },
    price:{
        type:Number,
        min:0,
        required:true
    },
    desc:{
        type:String,
        trim:true,
        required:true
    },
    Author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'    
    },
    AwgRating:{
        type:Number,
        default:0
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
        
    ]
})
// productSchema.pre('findOneAndDelete',async function(data){
//     console.log('pre')
//     console.log(data);
//    //// generally pre ki jarurat ni hoti query chalne ke baad data post m show hoya h 
// })


// // mongoose middleware function to delete all associated query

productSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length>0){
        await Review.deleteMany({ _id: { $in: product.reviews}});
    }
})


const Product=mongoose.model('Product',productSchema);
module.exports=Product