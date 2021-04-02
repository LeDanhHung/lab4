
var express = require('express');
var app = express();
var expressHbs = require('express-handlebars');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use('/assets',express.static(__dirname+'/assets'))
app.engine('handlebars', expressHbs({
    layoutsDir:__dirname + '/views/layouts',
    defaultLayout:'main'
}))
app.set('view engine', 'handlebars')

app.get('/', function(request,response){
    response.render('home');
});
app.get('/login', function (request, response) {

    response.render('login');
});
app.get('/dangki', function (request, response) {
    response.render('dangki');
});
app.get('/user', function (request, response) {
    response.render('user');
});
app.post('/', function(request,response){

});
app.post('/login', function (request, response) {
    
    response.redirect('/login');
});
app.post('/dangki', function (request, response) {
   
    response.redirect('/dangki');
});

app.listen(process.env.PORT || '3006')