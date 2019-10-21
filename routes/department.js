var express = require('express');
var router = express.Router();

const { Department } = require('../services/models')


router.get('/list', function(req, res, next) {
    
    Department
        .findAll()
        .then((committees) => {
            res.json(committees)
        })
        .catch(console.error)

});




module.exports = router;