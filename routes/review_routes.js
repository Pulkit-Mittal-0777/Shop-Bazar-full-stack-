const express=require('express');
const router=express.Router();
const Review=require('../models/Review')
const Product=require('../models/Product')
const {validateReview,isloggedin,isAuthor,isReviewAuthor}=require('../middleware');
router.post('/products/:id/review',isloggedin,validateReview ,async(req,res)=>{
    try{
        const {id}=req.params;
        const {ratings,comments}=req.body /// in place of this {...req.body}=> spread operator
        const product=await Product.findById(id);
        console.log(ratings);
        const Rating=((product.AwgRating*product.reviews.length)+parseInt(ratings))/(product.reviews.length+1);
        
        product.AwgRating=parseFloat(Rating.toFixed(1));
        const review=new Review({ratings,comments,Author:req.user._id});

        product.reviews.push(review);
        // console.log(review);
        await review.save();
        await product.save();  // product m changes hue h to product bhi save krna pdega
        req.flash('success','successfully added')
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
        
    }
})

router.delete("/products/:pro_id/:re_id",isloggedin,isReviewAuthor,async(req,res)=>{
    const {pro_id,re_id}=req.params;
    const product=await Product.findById(pro_id);
    await Review.findByIdAndDelete(re_id);
    res.redirect(`/products/${pro_id}`);

})
module.exports=router;