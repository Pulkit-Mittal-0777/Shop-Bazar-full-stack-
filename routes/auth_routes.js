const express=require('express');
const router=express.Router();
const User=require('../models/User');
const passport=require('passport');


router.get('/fakeuser',async(req,res)=>{
    const user={
        email:'pulkitmittal218@gmail.com',
        username:'pulkit'
    }
    const newuser=await User.register(user,'pulkit')
    res.send(newuser)
})
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

router.post('/register',async(req,res)=>{

    // res.send(req.body)
    try{

        const {username,email,password,role}=req.body;
        const user=new User({username,email,role});
        const newuser=await User.register(user,password);
        req.login(newuser, function(err) {
            if (err) { 
                return next(err); 
            } 
            ////  req.login this method provide facility to login the user just after register ni wait to login again after signup
            
            req.flash('success', 'Welcome , You are Registered Successfully');
            return res.redirect('/products');
        });
    }
    catch (e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
    
    
})
router.get('/login',(req,res)=>{
    
    res.render('auth/login')
    
    
   
    
})

// it is a middleware of passport it just take user details and send it 
// / to app.js file on passport.use(new LocalStrategy(User.authenticate()))
// // theck it will check and compare user with data base
// / if it is true then redirect it to product and if fail then redirect to login page again

router.post('/login',
  passport.authenticate('local', { 
        
        failureRedirect: '/login',
        failureFlash: true
  }),
    (req, res) => {
    
   
    req.flash('success', 'welcome back' );
    console.log(req.user);
    console.log(req.session);
    res.redirect('/products');
});

router.get('/logout', (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Good Bye user see you Again');
        console.log(req.user)
        res.redirect('/login');
    });
    

});
module.exports=router