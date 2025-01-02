const express=require('express');
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport=require("passport");
const { saveredirectUrl } = require('../middleware');
const router=express.Router();
// ---Signup get request---------------------------------------
router.get("/signup",(req,res)=>{
    res.render('listings/signup.ejs');
});
// ---Signup Post request---------------------------------------
router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {email,username,password}=req.body;
        const newUser=new User({email,username,});
        let registeredUser=await User.register(newUser,password);
        req.login(registeredUser,((err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to Wandurlust");
            res.redirect("/listings");
        }));
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

}));
// ----Login Get request----------------------------------------
router.get("/login",(req,res)=>{
res.render("listings/login.ejs");
});
// ----Login Post request----------------------------------------
router.post("/login",saveredirectUrl,passport.authenticate("local",
    {failureRedirect:"/login",failureFlash:true,}),
    async(req,res)=>{
        req.flash("success","Welcome back to wanderlust");
     let redirectUrl=res.locals.redirectUrl||"/listings";
        res.redirect(redirectUrl);

});
// ---logout router-----------------------------------------------------
router.get("/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Logout successfuly");
        res.redirect("/listings");
    });
})
module.exports=router;