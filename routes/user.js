var express = require('express');
var router = express.Router();


/* GET user profile. */
router.get('/profile', function(req, res, next) {
    res.send(req.user);
});

module.exports = router;