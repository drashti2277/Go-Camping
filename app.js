var  express        = require("express"),
     app            = express(),
     bodyParser     = require("body-parser"),
     mongoose       = require("mongoose"),
     passport       = require("passport"),
     flash          = require("connect-flash"),
     LocalStrategy  = require("passport-local"),
     methodOverride= require("method-override"),
     Campground     = require("./models/campgrounds.js"),
     Comment        = require("./models/comment.js"),
        User        = require("./models/user.js"),
     seedDB          = require("./seeds.js");

var commentRoutes    = require("./routes/comments.js"),
    campgroundRoutes =  require("./routes/campgrounds.js"),
    // authRoutes    =  require("./routes/auth.js"),
    indexRoutes      =   require("./routes/index.js");
    app.locals.moment = require("moment");
     
     var url = process.env.DATABASEURL || "mongodb://localhost/go_camping";
    mongoose.connect(process.env.DATABASEURL);
  
  //mongoose.connect("mongodb://Drashti:password@ds147469.mlab.com:47469/yelpcamp");
  
   
    app.use(bodyParser.urlencoded({extended:true}));
    app.set("view engine","ejs");
    app.use(express.static(__dirname +"/public"));
    app.use(methodOverride("_method"));  
    app.use(flash());
    
   // seedDB();   //seed the db   
    
 //Passport configuration
 app.use(require("express-session")({
     secret: "unicorns are real",
     resave :false,
     saveUninitialized : false
     }));   
     app.use(passport.initialize()); 
     app.use(passport.session());
     passport.use(new LocalStrategy(User.authenticate()));
     passport.serializeUser(User.serializeUser());
     passport.deserializeUser(User.deserializeUser());
     app.use(function(req,res,next){
         res.locals.currentUser = req.user;
         res.locals.error = req.flash("error"); 
         res.locals.success = req.flash("success"); 
         next();
     });


app.use (indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Go-Camping server has started");
});
