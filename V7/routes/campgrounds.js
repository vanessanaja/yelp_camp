const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

router.get('/campgrounds', function(req, res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });    
});

router.post('/campgrounds', function(req, res){
    let name = req.body.name; 
    let image = req.body.image; 
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};
    
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

router.get('/campgrounds/new', function(req, res){
  res.render('campgrounds/new'); 
});

router.get('/campgrounds/:id', function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           console.log("found campground");
           // render show template with that campground
           res.render('campgrounds/show', {campground: foundCampground});
       }
    });
    req.params.id;
});

module.exports = router;