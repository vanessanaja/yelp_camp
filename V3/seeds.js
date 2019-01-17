const mongoose = require("mongoose");
const Campground = require("./models/campground");
const data = [
    {
        name: "Malibu Creek",
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "One of my favorite So Cal campgrounds"
    },
    {
        name: "Kern River",
        image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
        description: "My favorite Central Ca campground"
    },
    {
        name: "Russian River",
        image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
        description: "One of my fave NorCal campgrounds"
    }
]

function seedDB(){
    //remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds");
            //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, data){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campgrounds")
                }
            });
        });
    });

    
    
    //add a few comments
}

module.exports = seedDB;


