var express 		= require("express"),
    app				=express(),
    bodyParser		=require("body-parser"),
    mongoose		=require("mongoose"),
	passport		=require("passport"),
	LocalStrategy	=require("passport-local"),
	Campground		=require("./models/campground"),
	Comment			=require("./models/comment"),
	User			=require("./models/user"),
	seedDB			=require("./seeds");
var commentRoutes	=require("./routes/comments"),
    campgroundRoutes=require("./routes/campgrounds"),
	authRoutes      =require("./routes/auth");

  

//seedDB();

mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true,useUnifiedTopology:true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));

app.use(require("express-session")({
	
	secret:"Once again rusty is dog",
	resave:false,
	saveUninitialized:false
	
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});




// var campgroundSchema=new mongoose.Schema({
// 	name:String,
// 	image:String,
// 	description:String
// })

// var Campground=mongoose.model("Campground",campgroundSchema);

// Campground.create({
// 	name:"camp2",
// 	image:"https://invinciblengo.org/photos/event/slider/shimla-summer-adventure-camp-himachal-pradesh-0Dv6PfW-1440x810.jpg",
// 	description:"This is shimla,one of biggest camp"
// },function(err,camp){
// 	if(err){
// 		console.log("Error!");
// 		console.log(err);
// 	}else{
// 		console.log("We added new campground");
// 		console.log(camp);
// 	}
	
// })

app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);




app.listen(3000,function(){
	console.log("Yelpcamp server is started");
})