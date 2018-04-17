var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
UserSchema.plugin(passportLocalMongoose);// This adds methods to serialize and deserialze automatically.

module.exports= mongoose.model("User", UserSchema);