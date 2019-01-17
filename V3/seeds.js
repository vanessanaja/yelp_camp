const mongoose = require("mongoose");
const Campground = require("./models/campground");

function seedDB(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
    });
}

module.exports = seedDB;


