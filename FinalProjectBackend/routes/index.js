var express = require('express');
var router = express.Router();
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'sprint0'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
