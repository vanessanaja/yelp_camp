const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//SCHEMA setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

const Campground = mongoose.model("Campground", campgroundSchema); 

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log("newly created campground");
//         console.log(campground);
//     }
// });


app.get('/', function(req, res){
   res.render('landing'); 
});

app.get('/campgrounds', function(req, res){
    // get all campgrounds from db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: allCampgrounds});
        }
    });    
});

app.post('/campgrounds', function(req, res){
    let name = req.body.name; 
    let image = req.body.image; 
    let newCampground = {name: name, image: image}
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
   res.render('new.ejs'); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp Camp server has started');
});