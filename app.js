var express      = require('express'),
    app          = express();

app.set('view engine', 'ejs');

app.get('/', function(req,res) {
    res.render('index');
});

//===========================//


app.listen(process.env.PORT||8080, function() {
    console.log('The YelpCamp Server Has Started!!!')
});




