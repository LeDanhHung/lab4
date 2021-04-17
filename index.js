
var express = require('express');
var app = express();
var expressHbs = require('express-handlebars');
var router = express.Router();
const mongoose = require("mongoose");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var urlDb =
    "mongodb+srv://admin:admin@cluster0.fcoai.mongodb.net/tinder?retryWrites=true&w=majority";
mongoose.connect(urlDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
const { Schema } = mongoose;
const user = new Schema({
    email:String,
    password: String,
    name: String,
    date: String,
    gioitinh: String,
    gioithieu: String,
    sothich: String,
    avatars: String,
});
var connectUsers;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("kết nối thành công");
    
});
router.get("/", function (req, res, next) {
  res.render('home');
});
app.post("/insertUser", upload.single('avatars'), (req, res, next) => {
    connectUsers = db.model("users", user);
    connectUsers({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        date: req.body.date,
        gioitinh:req.body.gioitinh,
        sothich: req.body.sothich,
        gioithieu:req.body.gioithieu,
       // avatars:req.file.path,
    }).save(function (err) {
        if (err) {
           console.log(err);
        } else {
            res.redirect("/");
        }
    });
});
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
    var connectUsers = db.model("user", user);
     connectUsers.find({}, function (err, users) {
        if (err) {
            console.log(err);
        } else {
            response.render('user', { users: users }, {
                allowProtoMethodsByDefault: true,
                allowProtoPropertiesByDefault: true
            });
        }
    });
});
app.post('/', function(request,response){

});
app.post('/login', function (request, response) {
    
    response.redirect('/login');
});
app.post('/dangki', function (request, response) {
   
    response.redirect('/dangki');
});
 app.post('/insertUser', function (request, response) {
     response.redirect('/'); });

app.listen(process.env.PORT || '3007')