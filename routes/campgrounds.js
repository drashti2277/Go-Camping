var express = require("express");
var router =express.Router();
var Campground = require("../models/campgrounds.js");
var middleware = require("../middleware/index.js");

router.get("/", function(req,res){
  //get all the campground from db
    Campground.find({}, function(err,allcampGrounds){
        if(err){console.log(err);}
        else{ 
            res.render("campgrounds/index", {campgrounds : allcampGrounds, currentUser:req.user, page :'campgrounds'});}
    });
});
   
router.post("/",middleware.isLoggedIn ,function(req,res){
 var image = req.body.img;
 var price  = req.body.price;
  var name = req.body.name;
  var desc = req.body.description;
  var author = {
      id : req.user._id,
      username: req.user.username
  };
  var newCampground = {name : name, price : price, img: image, description: desc, author:author };
  //create a new campground aND SAVE it to db
 
  Campground.create(newCampground, function(err,newlyCreated){
      if(err){console.log(err);
      }
      else{
          
        res.redirect("/campgrounds");  
      }
      });
  });

router.get("/new",middleware.isLoggedIn , function(req, res) {
    res.render("campgrounds/new");
});
//shows more info regarding campground
router.get("/:id", function(req, res) {
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec ( function(err, foundCampground){
        if(err){console.log(err);}
            else{
                 if(!foundCampground){
                        req.flash("error", "Item not found.");
                            return res.redirect("back");
                                 }
                                 //render show template
                            console.log(foundCampground);
    res.render("campgrounds/show", {campgrounds: foundCampground});
        }
    });
});
//Edit campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit.ejs", {campground : foundCampground}); 
            });
    });
//update campground  
router.put("/:id", middleware.checkCampgroundOwnership ,function(req,res){
    //find and update the correct campground 
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/"+updatedCampground._id);
        }
    });
});
//DESTROY CAMPGROUNDS 
router.delete("/:id", middleware.checkCampgroundOwnership,function(req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else{
          res.redirect("/campgrounds");
      }
   });
});


module.exports = router;