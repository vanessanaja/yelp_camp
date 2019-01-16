const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//SCHEMA setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema); 

// Campground.create({
//     name: "Granite Hill", 
//     image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//     description: "A great campground"
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
            res.render('index', {campgrounds: allCampgrounds});
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
   res.render('new.ejs'); 
});

app.get('/campgrounds/:id', function(req, res){
    //find campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else {
           // render show template with that campground
           res.render('show', {campground: foundCampground});
       }
    });
    req.params.id
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp Camp server has started');
});