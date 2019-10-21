var express = require('express');
var router = express.Router();
var multer = require('multer')

const { Committee,Room } = require('../services/models')

router.get('/list', function(req, res, next) {
    Room
        .findAll()
        .then((committees) => {
            res.json(committees)
        })
        .catch(console.error)
});




module.exports = router;