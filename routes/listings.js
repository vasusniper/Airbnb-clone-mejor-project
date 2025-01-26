const express=require('express');
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require('../utils/wrapAsync.js');
const {isLoggedIn,isOwner,listingValidate}=require("../middleware.js");
const { index,createList, addNewpage, showList, updateForm,updatedData,deleteList,searchInfo} = require('../controllers/listing.js');
const {storage}=require("../cloudConfig.js");
const multer=require("multer");
const upload=multer({storage});
router.route("/")
.get(searchInfo)
.get(wrapAsync(index))
.post(
    isLoggedIn,
    upload.single("listing[image]"),
   listingValidate,
    wrapAsync(createList)
);
;
// Create Get Rout-----------------------------------------------------
router.get("/new",isLoggedIn,addNewpage);
router.route("/:id")
.get(wrapAsync(showList))
.put( upload.single("listing[image]"),listingValidate,wrapAsync(updatedData))
.delete(isLoggedIn,isOwner, wrapAsync(deleteList));
//Update Get Route----------------------------------------------
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(updateForm))
module.exports=router;