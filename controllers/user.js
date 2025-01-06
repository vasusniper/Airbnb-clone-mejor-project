const User = require('../models/user');
module.exports.signupForm=(req,res)=>{
    res.render('listings/signup.ejs');
}
module.exports.signUp=async(req,res)=>{
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

}
module.exports.loginForm=(req,res)=>{
    res.render("listings/login.ejs");
    }
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to wanderlust");
 let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);

}
module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","Logout successfuly");
        res.redirect("/listings");
    });
}