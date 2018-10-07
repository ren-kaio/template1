let express = require('express');
let app = express();

let gulp = require('gulp');


gulp.task('default', function () {

});

//set the view egine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/blogpost', function (req, res) {
    res.render('blogpost');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


/* пока не работает - сделать по образцу из Yelp-Camp:
либо мб вообще тут можно все сделать без express - тогда удалить app.js
если express не нужен для сборки ejs - то пока не обязательно



var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var campgrounds = [
    {  name: "Salmon Greek", image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg" },
    {  name: "Granite Hill", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg" },
    {  name: "Mountains Goat's Rest", image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg" }
];

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {

    res.render('campgrounds', {campgrounds: campgrounds} );

});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name:name, image: image};
    campgrounds.push(newCampground);

    res.redirect('/campgrounds');
} );

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT||3000, function() {
    console.log('The YelpCamp Server Has Started!!!')
});

*/




