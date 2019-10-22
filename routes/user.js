var express = require('express');
var router = express.Router();

const {User} = require('../services/models')
/* GET user profile. */
router.get('/profile', function(req, res, next) {
    if(req.query.id) {
        User.findOne({
            where: {
                sap: req.query.sap
            }
        })
        .then((user) => {
            if(user) {
                res.json(user)
            } else {
                res.status(400).end()
            }
        })
    } else res.send(req.user);
});
router.get('/registrations', function(req, res, next) {
    if(req.query.id) {
        User.findOne({
            where: {
                sap: req.query.sap
            }
        })
        .then((user) => {
            if(user) {
                res.json(user)
            } else {
                res.status(400).end()
            }
        })
    } else res.send(req.user);
});

module.exports = router;