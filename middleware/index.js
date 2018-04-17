var middlewareObj = {};
var Campground = require("../models/campgrounds.js");
var Comment =require("../models/comment.js");

middlewareObj.checkCampgroundOwnership =function(req, res, next){
    if(req.isAuthenticated()){
        //is user logged in?
         Campground.findById(req.params.id, function(err, foundCampground){
                    if(err){
                        req.flash("error", "Campground not found");
                        res.redirect("back");
                             } else{
                                 //add this to check if campground exists
                                 if(!foundCampground){
                                     req.flash("error", "Item not found.");
                                     return res.redirect("back");
                                 }
                                //does the user owns a campground?
                            if(foundCampground.author.id.equals(req.user._id)){
                              next();
                             }else{
                                 req.flash("error", "You dont have permission to do that");
                                res.redirect("back");
                                 }
                            }
                        });
            }else {
                            req.flash("error", "You need to be logged in to do that");
                             res.redirect("back");
                                 }
                             }
    

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //is user logged in?
         Comment.findById(req.params.comment_id, function(err, foundComment){
                    if(err){res.redirect("back");
                     } else{
                         //does the user owns a comment?
                         if(foundComment.author.id.equals(req.user._id)){
                              next();
                         }else{
                              req.flash("error","You need to be logged in to do that");
                            res.send ("back");
                         }
                    }
                 });
    }else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn =function(req, res, next ){
if(req.isAuthenticated()){
    return next();}
    req.flash("error", "You need to be looged in  to do that");
    res.redirect("/login");
}

module.exports =middlewareObj;