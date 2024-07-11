const express=require('express');
const router=express.Router();
const User=require('../models/User');
const Product=require('../models/Product');
const {isloggedin}=require('../middleware');


router.get('/user/cart',async(req,res)=>{
    const user=await User.findById(req.user._id).populate('cart');
     // populate isliye krte h kyuki user ke cart field me product ki id dali h unke correspnding jo product hoga vo nikalne k liye
     const totalAmount=user.cart.reduce((sum,curr)=>sum+curr.price,0);
    res.render('cart/cart',{user,totalAmount})

})


router.post('/user/:productid/add',async(req,res)=>{
    const {productid}=req.params;
  
    const product=await Product.findById(productid);
    const user=await User.findById(req.user._id);
    user.cart.push(product);
    await user.save();
    res.redirect(`/products/${productid}`);
})



module.exports=router;