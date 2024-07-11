const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const seed=require('./seed');
const ejsMate=require('ejs-mate')

const methodOverride=require('method-override');
const session=require('express-session');
const flash=require('connect-flash')

const passport=require('passport');
const LocalStrategy=require('passport-local')

const User=require('./models/User');

const product_routes=require('./routes/product_routes');
const review_routes=require('./routes/review_routes');
const auth_routes=require('./routes/auth_routes');
const productApi=require('./routes/productApi');
const cart_routes=require('./routes/cart_routes');

mongoose.connect('mongodb://127.0.0.1:27017/shopping-app') // it return a promise
    .then(()=>{
        
        console.log('db connected successfully');
    })
    .catch((err)=>{
        console.log("db error");
        console.log(err);
    })
// seed();
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))


app.set('view engine','ejs');
app.engine('ejs',ejsMate);
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly:true,   /// taki hamari session id koi churaa na paye
        expires:Date.now()+1000*60*60*24*7*1,  // 1 week tk login rakhna chahte h
        maxAge:1000*60*60*24*7*1 /// chahe expire dedo chahe max age dedo
    }
    
}))
app.use(flash());

//  / middleware for initialize  passport
app.use(passport.initialize());
//  middle for passport session
app.use(passport.session());


passport.serializeUser(User.serializeUser()); // to store user information into session
passport.deserializeUser(User.deserializeUser()); //to remove user information when it logged out



// // ye likhne ki jarurat ni h passport.use ke andar
//// bcoz we use passport-local-mongoose pakage it will provide automatic facilities
/// // we need to give Authenticate() method inside new localstrategy(model.Authenticate())

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false); }
//         if (!user.verifyPassword(password)) { return done(null, false); }
//         return done(null, user);
//       });-
//     }
// ));



passport.use(new LocalStrategy(User.authenticate()))
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// / telling the passport to check for the username and password using authenticate method provided by the passport-local-mongoose
    




app.use(product_routes);
app.use(review_routes);
app.use(auth_routes);
app.use(productApi);
app.use(cart_routes);

app.listen('3000',()=>{
    console.log('server open at port 3000')
})