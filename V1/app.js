const express = require("express");
const app = express();

app.get('/', function(req, res){
   res.send('landing page will be here shortly'); 
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Yelp Camp server has started');
});