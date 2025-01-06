const Listing=require("../models/listing");

module.exports.index=async (req, res) => {
    let listings = await Listing.find({});
    res.render("listings/index.ejs",{ listings});

}
module.exports.addNewpage=(req,res)=>{
res.render("listings/addNew.ejs");
}

module.exports.createList=async(req,res)=>{
    let listing=new Listing(req.body.listing);
    listing.owner=req.user._id;
    await listing.save();
    req.flash("success","listing Created successfully")
    res.redirect("/listings");
    }
module.exports.showList=async(req,res)=>{
        let {id}=req.params;
        let listInfo= await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
        if(!listInfo){
            req.flash("error","This list not availble");
            res.redirect("/listings");
        }
        res.render("listings/showlist.ejs",{listInfo});
        
        }
module.exports.updateForm=async(req,res,next)=>{
    let {id}=req.params;
    let user= await Listing.findById(id);
    res.render("listings/Update.ejs",{id,user});
}
module.exports.updatedData=async(req,res,next)=>{
    let {id}=req.params;
    let updateInfo=req.body.listing;
    await Listing.findByIdAndUpdate(id,{...updateInfo});
    req.flash("success","listing successfully Updaated")
    res.redirect(`/listings/${id}`)
    
}
module.exports.deleteList=async(req,res,next)=>{
    let {id}=req.params;
await Listing.findByIdAndDelete(id);
req.flash("success","listing successfully deleted")
res.redirect("/listings");
}