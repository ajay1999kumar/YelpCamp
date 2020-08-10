var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");

router.get("/campground",function(req,res){
	
	Campground.find({},function(err,camps){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/Index",{campground:camps});
			
		}
	})
	
})



router.post("/campground",isLoggedIn,function(req,res){
	var name=req.body.name;
	var image=req.body.image;
	var desc=req.body.description;
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newCampground={name:name,image:image,description:desc,author:author};
	
	Campground.create(newCampground,function(err,newCamps){
		if(err){
				console.log(err)
;		}else{
	
	         res.redirect("/campground");
	
}
	})
	
	
	
})

router.get("/campground/new",isLoggedIn,function(req,res){
	
	res.render("campgrounds/new");
});

router.get("/campground/:id",function(req,res){
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){

		console.log(err)
		}else{
			
			res.render("campgrounds/show",{campground:foundCampground});
			
		}
	})
	
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();

	}
	else{
		res.redirect("/login");
	}

}



module.exports=router;