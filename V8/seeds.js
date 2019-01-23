const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const data = [
    {
        name: "Malibu Creek",
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "Bacon ipsum dolor amet pork loin chicken shoulder, sirloin short ribs frankfurter short loin turkey kevin hamburger flank drumstick. Sausage porchetta meatball ham hock doner bacon burgdoggen. Pork chop ribeye brisket jowl. Ribeye andouille porchetta chuck capicola shankle pork filet mignon bresaola fatback chicken picanha kevin cow. Kevin ground round corned beef rump kielbasa turkey meatball beef ribs. Pancetta pork picanha jerky bresaola prosciutto pig t-bone tenderloin meatball sirloin shankle."
    },
    {
        name: "Kern River",
        image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
        description: "Bacon ipsum dolor amet pork loin chicken shoulder, sirloin short ribs frankfurter short loin turkey kevin hamburger flank drumstick. Sausage porchetta meatball ham hock doner bacon burgdoggen. Pork chop ribeye brisket jowl. Ribeye andouille porchetta chuck capicola shankle pork filet mignon bresaola fatback chicken picanha kevin cow. Kevin ground round corned beef rump kielbasa turkey meatball beef ribs. Pancetta pork picanha jerky bresaola prosciutto pig t-bone tenderloin meatball sirloin shankle."
    },
    {
        name: "Russian River",
        image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg",
        description: "Bacon ipsum dolor amet pork loin chicken shoulder, sirloin short ribs frankfurter short loin turkey kevin hamburger flank drumstick. Sausage porchetta meatball ham hock doner bacon burgdoggen. Pork chop ribeye brisket jowl. Ribeye andouille porchetta chuck capicola shankle pork filet mignon bresaola fatback chicken picanha kevin cow. Kevin ground round corned beef rump kielbasa turkey meatball beef ribs. Pancetta pork picanha jerky bresaola prosciutto pig t-bone tenderloin meatball sirloin shankle."
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
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campgrounds");
                    //create a comment
                    // Comment.create(
                    //     {
                    //         text: "I love this campground. So awesome!!!",
                    //         author: "Someone"
                    //     }, function(err, comment){
                    //         if(err){
                    //             console.log(err);
                    //         } else {
                    //             campground.comments.push(comment);
                    //             campground.save();
                    //             console.log("created new comment");
                    //         }
                    //     }
                    // );
                }
            });
        });
    });
}

module.exports = seedDB;


