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
           res.render('campgrounds/show', {campground: foundCampground});
       }
    });
});
    
router.get('/:id/edit', function(req, res){
    if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    console.log(err);
                    res.redirect('/campgrounds');
                } else {
                    if(foundCampground.author.id.equals(req.user._id)){
                        res.render('campgrounds/edit', {campground: foundCampground}); 
                    } else {
                        res.send("You do not have permission to do that");
                    }
                }
          });
        } else {
            console.log("you need to be logged in");
            res.send("you need to be logged in");
        }
});

router.put('/:id', function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
             if(err){
                 console.log(err);
                 res.redirect('/campgrounds');
             } else {
                 res.redirect('/campgrounds/' + req.params.id);
             }
    });
});

router.delete('/:id', function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
     if(err){
         res.redirect('/campgrounds/' + req.params.id);
     } else {
         res.redirect('/campgrounds');
     }
  }); 
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;