// these are the middleware  of express as we already read in middleware folder
//  ye kya kreaga jo schemas folder banaya h for validation at server side waha se check krlege 
// agar error hogi to error de dega wrna next() function isko jis naam se middleware banaya h 
// vo get request m dala hoga to wahi pahucha dega

const {productSchema,reviewSchema}=require('./schemas');

const Product=require('./models/Product');
const Review=require('./models/Review');
module.exports.isloggedin=(req,res,next)=>{
    // console.log(req.originalUrl);
    // req.session.returnUrl=req.originalUrl;
    // console.log(req.session);
    // console.log(req.xhr) -> to know whether req is AJAX or Not return true or false
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({msg:'you need to login first'})
        // // status 401 means you are unauthorised user
        
    }
    // console.log(req.originalUrl); //// will print the path from where the middleware islogged in is active
    //req.session.returnUrl=req.originalUrl;
    // console.log(req.session);
    if(!req.isAuthenticated()){
        req.flash('success','you need to login first');
        return res.redirect('/login')
    }
    next();
}

module.exports.validateProduct=(req,res,next) =>{
    const {name,img,desc,price}=req.body;
    const {error}=productSchema.validate({name,img,desc,price})

    if(error){
        const msg=error.details.map((err)=>err.message).join(',');

        //  details error ki array h yha sari error nikal ke unko comma(,) se join kiya ja ra h
        // return res.render('error',{err:msg});
        return res.redirect('/products');
    }
    next();
}
module.exports.validateReview=(req,res,next) =>{
    const {ratings,comments}=req.body;
    const {error}=reviewSchema.validate({ratings,comments})

    if(error){
        const msg=error.details.map((err)=>err.message).join(',');
        
        return res.render('error',{err:msg});
    }
    next();
}
module.exports.isseller=(req,res,next)=>{
    if(!req.user.role || req.user.role!=='seller'){
        req.flash('error','you are not allowed to do that')
        return res.redirect('/products');
    }
    next();
}
module.exports.isAuthor=async(req,res,next)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    if(!product.Author.equals(req.user._id)){
        req.flash('error','you are not allowed to do that')
        return res.redirect(`/products/${id}`);
    }
    next();

}
module.exports.isReviewAuthor=async(req,res,next)=>{
    const {pro_id,re_id}=req.params;
    const review=await Review.findById(re_id);
    if(!review.Author.equals(req.user._id)){
        req.flash('error','you are not allowed to do that')
        return res.redirect(`/products/${pro_id}`);   
    }
    next();
}
