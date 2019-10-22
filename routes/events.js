var express = require('express');
var router = express.Router();

const { User,Event,RegisterEvent } = require('../services/models')

router.get('/list', function(req, res, next) {
    Event
        .findAll({
            where: {
                committeeId:req.query.committeeId
            }
        })
        .then((committees) => {
            res.json(committees)
        })
        .catch(console.error)
});


router.post('/register',function(req, res, next) {
    var regBody = req.body;
    console.log(regBody)
    User.findOne({
        where: {
            sap:regBody.userID
        }
    }).then((user) => {
        if(user) {
            return Event.findOne({
                where: {
                    id:regBody.eventID
                }
            });
            return;
        }
        throw new Error("User not there")
    }).then((event) => {
        if(event) {
            re = RegisterEvent.build(regBody);
            re.save()
                .then(() => res.status(200).end())
                .catch((e) => {console.log(e);res.status(400).end()})
            return;
        }
        throw new Error("Event not there")
    })
    .catch((e) => {console.log(e);res.status(502).end()})

});



router.post('/create', function(req, res, next) {
    
    body = req.body
    com = Event.build(body);
    com.save()
        .then(() => res.status(200).end())
        .catch((e) => {console.log(e);res.status(400).end()})
});


module.exports = router;