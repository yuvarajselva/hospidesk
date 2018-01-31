var express = require("express");
var router = express.Router();

//routing the index page
module.exports = function(app) {
 app.get('/search', function(req, res) {
   res.render('pages/search');
 });
};


module.export = router;
