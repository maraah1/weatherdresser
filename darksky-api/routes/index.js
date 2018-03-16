var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET home page. */
router.get('/:lat/:lng', function(req, res, next) {
  fetch('https://api.darksky.net/forecast/f8e937e308980cca4d22ca975e69a15c/' + req.params.lat + ',' + req.params.lng)
    .then(response => response.json())
    .then(data => {
      res.json(data)

    })
    .catch(err => console.error(err));
});

module.exports = router;