var express = require("express");
var router =express.Router();
var passport = require("passport");
var User = require("../models/user.js");
//root route
router.get("/", function(req,res){
    res.render("landing");
});

//show register form
router.get("/register", function(req, res) {
    res.render("register.ejs", {page:'register'}); 
});
//handle signup logic
router.post("/register", function(req, res) {
    
    var newUser =new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
      if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
      passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
          res.redirect("/campgrounds");
      });
   });
});

//LOGIN
router.get("/login", function(req, res) {
   res.render("login.ejs",{page: 'login'}); 
});
router.post("/login", passport.authenticate("local",
        {
            successRedirect:"/campgrounds",
            failureRedirect:"/login" 
            }),
function(req, res) {
    });
 

//LOGOUT ROUTE
router.get("/logout",function(req, res) {
   req.logout(); //dont need to write it down, it comes in package we installed. But it needs to be redirected
   req.flash("success", "Logged you out");
   res.redirect("/campgrounds");
});
function isLoggedIn(req, res, next ){
if(req.isAuthenticated()){
    return next();}
    
    res.redirect("/login");
}
module.exports = router;