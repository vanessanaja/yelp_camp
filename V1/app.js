const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
   res.render('landing'); 
});

app.get('/campgrounds', function(req, res){
   var campgrounds = [
        {name: 'Salmon Creek', image:'https://source.unsplash.com/y8Ngwq34_Ak'},
        {name: 'Malibu Creek', image:'https://source.unsplash.com/1azAjl8FTnU'},
        {name: 'Frog Pond', image:'https://source.unsplash.com/eDgUyGu93Yw'}
       ] 
        res.render('campgrounds', {campgrounds: campgrounds});
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp Camp server has started');
});