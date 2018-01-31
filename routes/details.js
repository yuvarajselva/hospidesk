var express = require("express");
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/hospidesk';



//routing the details page
module.exports = function(app) {
 app.get('/view', function(req, res) {
   // var cursor  = db.collection('registration').find();

   MongoClient.connect(url,function(err,db){
     if(err)
     console.log(err);
     else
     var cursor  = db.collection('registrations').find().toArray(function(err,results){
       res.render('pages/details',{registrations:results});
      console.log(results);
     })
   })
   })

 };

module.export = router;
