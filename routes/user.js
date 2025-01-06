const express=require('express');
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport=require("passport");
const { saveredirectUrl } = require('../middleware');
const { signUp, signupForm, loginForm, login, logout } = require('../controllers/user');
const router=express.Router();
router.route("/signup")
.get(signupForm)
.post(wrapAsync(signUp));
router.route("/login")
.get(loginForm)
.post(saveredirectUrl,passport.authenticate("local",
    {failureRedirect:"/login",failureFlash:true,}),login);
// ---logout router-----------------------------------------------------
router.get("/logout",logout)
module.exports=router;