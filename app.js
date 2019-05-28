var express = require('express');
var app = express();
var router = require('./router/router.js');


app.set('view engine','ejs');
app.use('/public',express.static('public'));
app.get('/addposition',router.addPosition);
app.get('/addfoodtype',router.addFoodtype);
app.get('/addpositionshops',router.addPositionshops);
// app.get('/addsearchshops',router.addSearchshops);
app.post('/login_pwd',router.login)
app.get('/position/:geohash',router.getPosition);

app.listen(3000);