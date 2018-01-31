var express = require("express");
var router = express.Router();

//routing the index page
module.exports = function(app) {
 app.get('/', function(req, res) {
   res.render('pages/index');
 });
};


module.export = router;
