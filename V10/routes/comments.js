const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");

router.get('/new', isLoggedIn, function(req, res){
    //find campground by ID
    Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});
       }
    });
});

router.post('/', isLoggedIn, function(req, res){
    //lookup campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment); 
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

router.get('/:comment_id/edit', function(req, res){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
                res.redirect('back');
            } else {
                res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
            }
    });
});

router.put('/:comment_id', function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }    
    });
});

router.delete('/:comment_id', function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          console.log(err);
          res.redirect('back');
      } else {
          res.redirect('/campgrounds/' + req.params.id);
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