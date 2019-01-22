const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user");
    seedDB = require("./seeds");
    
    // seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
   res.render('landing'); 
});

app.get('/campgrounds', function(req, res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    });    
});

app.post('/campgrounds', function(req, res){
    let name = req.body.name; 
    let image = req.body.image; 
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc}
    
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreatedCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

app.get('/campgrounds/new', function(req, res){
  res.render('campgrounds/new'); 
});

app.get('/campgrounds/:id', function(req, res){
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
    req.params.id
});

//Comment Routes

app.get('/campgrounds/:id/comments/new', function(req, res){
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

app.post('/campgrounds/:id/comments', function(req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp Camp server has started');
});