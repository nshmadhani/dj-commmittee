
const express = require('express');
const router   = express.Router();
const jwt      = require('jsonwebtoken');
const passport = require('passport');


const {User} = require('../services/models')

router.post('/login', function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user,"NSH1000");
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 60) 
            })
            res.status(200).end()
        });
    }) (req, res,next);
});
router.post('/signup', function (req, res, next) {


    //TODO: Department Check
    //TODO: Valiudations foe Requires
    //{ name,email,password,sap,department }

    var userBody = req.body;
    userBody.createdAt =  new Date();
    userBody.updatedAt =  new Date();
    userBody.type =  0;
    
    User.findOne({
        where: {
            sap:userBody.sap
        }
    }).then((user) => {
        if(user) {
            console.log(user)
            res.status(502).end()
        } else {
            user = User.build(userBody);
            user.save()
                .then(() => res.status(200).end())
                .catch(console.error)
        }
    })
});

module.exports = router;