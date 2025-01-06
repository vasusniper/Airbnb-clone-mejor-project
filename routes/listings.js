const express=require('express');
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require('../utils/wrapAsync.js');
const {isLoggedIn,isOwner,listingValidate}=require("../middleware.js");
const { index,createList, addNewpage, showList, updateForm,updatedData,deleteList} = require('../controllers/listing.js');
router.route("/")
.get(wrapAsync(index))
.post(isLoggedIn,listingValidate,wrapAsync(createList));
// Create Get Rout-----------------------------------------------------
router.get("/new",isLoggedIn,addNewpage);
router.route("/:id")
.get(wrapAsync(showList))
.put(listingValidate,wrapAsync(updatedData))
.delete(isLoggedIn,isOwner, wrapAsync(deleteList));
//Update Get Route----------------------------------------------
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(updateForm))
module.exports=router;
