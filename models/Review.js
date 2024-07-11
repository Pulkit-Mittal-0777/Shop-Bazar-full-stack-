const mongoose=require('mongoose');

const reviewSchema=new mongoose.Schema({
    ratings:{
        type:Number,
        min:1,
        max:5
    },
    Author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'    
    },
    comments:{
        type:String,
        trim:true
    }
});
const Review=mongoose.model('Review',reviewSchema);
module.exports=Review 