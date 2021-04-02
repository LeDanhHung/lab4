
var express = require('express');
var app = express();
var expressHbs = require('express-handlebars');

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
app.listen(process.env.PORT || '3006')