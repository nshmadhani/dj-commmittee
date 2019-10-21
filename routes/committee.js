var express = require('express');
var router = express.Router();
var multer = require('multer')

const { Committee } = require('../services/models')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
var upload = multer({ storage: storage })

router.get('/list', function(req, res, next) {
    
    Committee
        .findAll()
        .then((committees) => {
            res.json(committees)
        })
        .catch(console.error)

});

router.post('/create', upload.single('image'),function(req, res, next) {
    
    console.log(req.file)
    body = req.body
    body.image = req.file.originalname;
    bod.teacher_handler = req.user.id
    com = Committee.build(body);
    com.save()
        .then(() => res.status(200).end())
        .catch((e) => {console.log(e);res.status(400).end()})

});




module.exports = router;