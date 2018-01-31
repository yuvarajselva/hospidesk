var express = require("express");
var app = express();
var uniqid = require('uniqid');//uniqid declaration
var serialNumber = require('serial-number');
var port = 3000;//port declaration
var uniqueValidator = require('mongoose-unique-validator');
//mongodb
var mongoose = require("mongoose");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/hospidesk";
mongoose.connect('mongodb://localhost/hospidesk');
var path = require('path');
//defining the routes
var routes = require('./routes/index.js');
var details = require('./routes/details.js');
var search = require('./routes/search.js');
routes(app);
details(app);
search(app);

//view-engine
app.use('/public', express.static(process.cwd() + '/public'));
app.set('view engine','ejs');
//bodyParser
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//defining the Schema
var Schema = new mongoose.Schema({
    sno:{
      type:String,
      //unique:true
    },
    id:{
      type:String,
      unique:true
    },
    name: {
    type:String
  },
  phoneno:{
    type: Number,
    unique:true
  },
  emailid:{
    type:String,
    unique:true
  },
  collegename: {
    type:String
  },
  yr:{
    type:Number
  },
  dept:{
    type:String
  }
});

//unique validator
Schema.plugin(uniqueValidator);


  var user = mongoose.model('registration', Schema);


app.post('/process_post',function(req,res){                //app.post (data from form to database).
var id = uniqid.time();
serialNumber.useSudo(function (err, value) {
    console.log(value);
});
sno=value;
new user({
sno:sno,
id: id,
name: req.body.name,
phoneno:req.body.phoneno,
emailid:req.body.emailid,
collegename:req.body.college_name,
yr:req.body.yr,
dept:req.body.dept
}).save(function(err,doc){
if(err)res.json(err);
else res.send('Sucessfully inserted');
});
});


//setting the PORT
app.set('port', (process.env.PORT || 3000));
//connecting to the PORT
app.listen(app.get('port'),function (req,res) {
  console.log("Server listening on port " + port);
});
