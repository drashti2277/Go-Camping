
var mongoose= require("mongoose");
var Campground =require("./models/campgrounds");
var Comment = require("./models/comment");
 var data =[
     {  name:"Cloud's Rest", 
        img : "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
         
     },
        
    {  name:"Desert Mesa", 
        img : "http://www.onguma.com/uploads/6/2/0/8/6208718/201604-aoba-935_orig.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
        
    },
        
   {  name:"Canyon floor", 
        img : "http://www.fishergroundcampsite.co.uk/data1/images/camp1.jpg",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum"
       
     }
        ]
        
function seedDB(){
            Campground.remove({}, function(err){    
                  if (err){ 
                     console.log(err);
                             }
                     console.log("All the camps are removed ");
                     
                     
                      //add few campgrounds
                            data.forEach(function(seed){
                            Campground.create(seed, function(err, campground){
                             if(err){console.log(err);}
                                else{
                                    console.log("Added a campground");
                                    //create comment
                                    Comment.create(
                                        { 
                                            text:"this place is great but i wish there was internet",
                                            author: "homer"
                                        }, function(err,comment){
                                            if(err){console.log(err);}else{
                                            campground.comments.push(comment);
                                            campground.save();
                                            console.log("created new comment");
                                            }
                                        });
                                        
                                    }
                                });
                            });
                        });
                    }
    module.exports = seedDB; 