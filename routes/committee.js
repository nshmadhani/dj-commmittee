var express = require('express');
var router = express.Router();
var multer = require('multer')

const {
  Committee,User
} = require('../services/models')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
  storage: storage
})

router.get('/list', function (req, res, next) {

  Committee
    .findAll()
    .then((committees) => {
      res.json(committees)
    })
    .catch(console.error)

});

var cpUpload = upload.fields([{
  name: 'image',
  maxCount: 1
}, {
  name: 'logo',
  maxCount: 1
}])

router.post('/create', function (req, res, next) {

  body = req.body
  //body.image = req.files.image[0].originalname;
  //body.logo = req.files.logo[0].originalname;
  User.findOne({
      where: {
        sap: req.body.student_sap
      }
    })
    .then((user) => {
      if (user) {
        body.studentHandlerId = user.id
        com = Committee.build(body);
        com.save()
          .then(() => res.status(200).end())
          .catch((e) => {
            console.log(e);
            res.status(400).end()
          })
      }
    })


});




module.exports = router;