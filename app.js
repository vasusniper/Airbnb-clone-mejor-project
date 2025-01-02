const express=require('express');
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const ExpressError=require('./utils/expressError.js');
const listingRouter=require("./routes/listings.js")
const reviewRouter=require("./routes/reviews.js")
const userRouter=require("./routes/user.js")
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const localStrategy=require('passport-local');
const User=require('./models/user.js');
const ejsMate=require("ejs-mate");
const path=require('path');
const app=express();
const sessionOption={
    secret:"mysupersecretcode",
    saveUninitialized:false,
    resave:false,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }

}

//ejs-mate----------------------------------------------------------
app.engine('ejs', ejsMate);

// Middleware to parse JSON and URL-encoded data post ---------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//set ejs-------------------------------------------------------------
app.set("views",path.join(__dirname,"views"));
// For render ejs page-----------------------------------------------
app.set("views engine","ejs");
//for css-------------------------------------------------------------
app.use(express.static(path.join(__dirname,"public")));
//Method-override-----------------------------------------------------
app.use(methodOverride("_method"));
// Connection to Database---------------------------------------------
let url="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("Database connection successfully connectet");
}).catch((err)=>{
  console.log(err);
})
async function main(){
    await mongoose.connect(url);
};
// --- session middleware--------------------------
app.use(session(sessionOption));
app.use(flash());

// -----passport authantication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// --- locals session meddleware
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

// Use listings & Reviews route----------------------------------------
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

//----express error handler Page not found-------------------------------
app.all("*",(req,res,next)=>{
    let exError=new ExpressError(404,"Page not found")
    next(exError);

});
// Error Handler MiddlewareFunction-------------------------------------
app.use((err,req,res,next)=>{
    let {stetusCode,message}=err;
    res.render("listings/error.ejs",{message});
})
// localhost 8080-------------------------------------------------------
app.listen("8080",()=>{
    console.log("localhost working successfully working");
});
app.get("/",(req,res)=>{
    res.send("Server working successfully working on port 8080");
});