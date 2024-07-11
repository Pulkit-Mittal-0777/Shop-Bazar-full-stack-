const express=require('express');
const router=express.Router();
const Product=require('../models/Product')
const {validateProduct,isseller,isloggedin,isAuthor}=require('../middleware');
router.get('/products',async(req,res)=>{
    try{
        const products=await  Product.find({});
     
        res.render('products/index',{products})
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

router.get('/products/new',isloggedin,isseller,async(req,res)=>{
    try{
        res.render('../views/products/new');

    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})

router.post('/products',isloggedin,isseller,validateProduct,async(req,res)=>{
    try{
        const {name,img,price,desc} =req.body ;
        await Product.create({name,img,price,desc,Author:req.user._id,AwgRating:0});
        res.redirect('/products');  
    }

    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})
router.get('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product= await Product.findById(id).populate('reviews') // populate reviews field of product it just array of reviews
        res.render('products/show',{product});
    }

    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})
router.get('/products/:id/edit',isloggedin,async(req,res)=>{
    try{
        const {id}=req.params;
        const product= await Product.findById(id);
        res.render('products/edit',{product});
    }

    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})
router.patch('/products/:id',isloggedin,async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,img,price,des}=req.body
        const product= await Product.findByIdAndUpdate(id,{name,img,price,des}); 
        
        res.redirect(`/products/${id}`)
    }

    catch(e){
        res.status(500).render('error',{err:e.message})
    }
})
router.delete('/products/:id',isAuthor,async(req,res)=>{
    try{
        const {id}=req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }

    catch(e){
        res.status(500).render('error',{err:e.message})
    }

})
module.exports=router;