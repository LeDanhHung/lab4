
var express = require('express');
var app = express();
var expressHbs = require('express-handlebars');

app.engine('handlebars', expressHbs({
    layoutsDir:__dirname + '/views/layouts',
    defaultLayout:'main'
}))
app.set('view engine', 'handlebars')

app.get('/', function(request,response){
    var name = 'Danh Hung'
    var arr = ['Hùng','Lê','Danh'];
    response.render('home',{name:name,array:arr});
});
app.post('/', function(request,response){

});
app.listen(process.env.PORT || '3006')