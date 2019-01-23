const express = require("express");
const router = express.Router();

router.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

router.post('/campgrounds/:id/comments', isLoggedIn, function(req, res){
    //lookup campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                //connect new comment to campground
                    campground.comments.push(comment); 
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

module.exports = router;