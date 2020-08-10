var mongoose=require("mongoose"),
	Campground=require("./models/campground"),
    Comment=require("./models/comment");


var data=[
	{
		name:"camp5",
		image:"https://www.airtheworld.com/wp-content/uploads/2018/03/beach-resorts-in-europe-that-won39t-break-the-bank-affordable-849x540.jpg",
		description:"alkalklfkasl;akdj"
	},
	{
		name:"camp6",
		image:"https://www.kinnercamps.com/mobile/images/gallery/gal%20(3).jpg",
		description:"blah blah blah"
	},
	{
		name:"camp7",
		image:"https://invinciblengo.org/photos/event/slider/shimla-summer-adventure-camp-himachal-pradesh-0Dv6PfW-1440x810.jpg",
		description:"loremp epsom"
	}
]
 

function seedDB(){
	
	Campground.remove({},function(err){
  if(err){
   console.log(err);
  
  }
		else{
	  
	  console.log("removed campgrounds");
	  data.forEach(function(seed){
	Campground.create(seed,function(err,campground){
		if(err)
			{
				console.log(err);
			}else{
				
				console.log("campgrounds added!");
				Comment.create({
					text:"This is a great place but i wish there could there is internet",
					author:"Ajay",
					
				},function(err,comment){

				if(err)
					{

					console.log(err);
					}else{

						campground.comments.push(comment);
						campground.save();
						console.log("new comment created")
					}
				})
				
				
			}
	})
})
  }
});	
}


module.exports=seedDB;








