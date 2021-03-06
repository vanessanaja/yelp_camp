const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

router.get('/', (req, res)=>{
    // get all campgrounds from db
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });    
});

router.post('/', middleware.isLoggedIn, (req, res)=>{
    const name = req.body.name; 
    const price = req.body.price;
    const image = req.body.image; 
    const desc = req.body.description;
    const author = {
      id: req.user._id,
      username: req.user.username
    };
    const newCampground = {name: name, price: price, image: image, description: desc, author: author};
    
    Campground.create(newCampground, (err, newlyCreatedCampground)=>{
        if(err){
            console.log(err);
        } else {
            req.flash('success', 'Campground added');
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new', middleware.isLoggedIn, (req, res)=>{
  res.render('campgrounds/new'); 
});

router.get('/:id', (req, res)=>{
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
       if(err){
           req.flash('something went wrong');
           console.log(err);
       } else {
           console.log("found campground");
           res.render('campgrounds/show', {campground: foundCampground});
       }
    });
});
    
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        res.render('campgrounds/edit', {campground: foundCampground}); 
    });
});

router.put('/:id', middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
             if(err){
                 console.log(err);
                 res.redirect('/campgrounds');
             } else {
                 req.flash('success', 'Campground edited');
                 res.redirect('/campgrounds/' + req.params.id);
             }
    });
});

router.delete('/:id', middleware.checkCampgroundOwnership, (req, res)=>{
  Campground.findByIdAndRemove(req.params.id, (err)=>{
     if(err){
         res.redirect('/campgrounds/' + req.params.id);
     } else {
         req.flash('success', "Campground deleted");
         res.redirect('/campgrounds');
     }
  }); 
});

module.exports = router;