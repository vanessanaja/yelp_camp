const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

router.get('/', function(req, res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });    
});

router.post('/', isLoggedIn, function(req, res){
    const name = req.body.name; 
    const image = req.body.image; 
    const desc = req.body.description;
    const author = {
      id: req.user._id,
      username: req.user.username
    };
    const newCampground = {name: name, image: image, description: desc, author: author};
    
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', isLoggedIn, function(req, res){
  res.render('campgrounds/new'); 
});

router.get('/:id', function(req, res){
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

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;