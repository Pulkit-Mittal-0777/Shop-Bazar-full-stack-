const express=require('express');
const router=express.Router();
const Product=require('../models/Product')
const User=require('../models/User')
const {isloggedin} =require('../middleware');

// ek dikkat h ki agar user login ni hua to usko login page render ni hoga kyuki ye AJAX reruest h
// to phle hme middleware pe ja kr ke usko handle krna pdega
router.post('/products/:productid/like',isloggedin,async(req,res)=>{ 

    const {productid}=req.params;
    const user=req.user;
    // console.log(productid);
    // console.log(user)
    
    const isliked=user.wishList.includes(productid);
    // console.log(isliked);
    // console.log("kkkk");
    if(isliked){
        // ///  pull is a monodb operator ye kya krega agar wislist m productid hogi tb hi nikalega wrna ni nikalega
        req.user=await User.findByIdAndUpdate(req.user._id,{$pull :{wishList:productid}},{new:true});
    }
    else{
        //  // addtoset is a monodb operator ye kya krega agar wislist m productid ni hogi tb hi dalega wrna ni dalega
        req.user=await User.findByIdAndUpdate(req.user._id,{$addToSet :{wishList:productid}},{new:true});
    }

    res.send('like button');

})






module.exports=router;