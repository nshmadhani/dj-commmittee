var express = require('express');
var router = express.Router();


const { Committee } = require('../services/models')

/* GET user profile. */
router.get('/list', function(req, res, next) {
    
    Committee
        .findAll()
        .then((committees) => {
            res.json(committees)
        })
        .catch(console.error)

});

module.exports = router;