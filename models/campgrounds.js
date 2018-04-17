 //SCHEMA SETUP
 var mongoose    = require("mongoose");
 
var campgroundsSchema = new mongoose.Schema({
    name: String,
    price: String,
    img : String,
    description:String,
    createdAt: {
        type: Date, 
        default: Date.now
                },
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
        },
   comments: [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }
    ]
});
//compile this schema into model
module.exports= mongoose.model("Campground", campgroundsSchema);
 
 