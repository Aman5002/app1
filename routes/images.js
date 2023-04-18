const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId; 
const Image = require('../models/image');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');

var fs = require('fs');

const path = require('path');
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../frontend/public/images/')
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname+ '-' + Date.now()+'-'+ path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage })
let imgid = null
router.post('/image', upload.single('file'), function (req, res) {
  // console.log("fileeeee--->",req.file)
  imgid = req.file.filename
  res.json({})
})

router.put('/edim', fetchuser, async (req, res) => {
  const im = await Image.findById(req.body.id)
  console.log(im.imgUrl)
  fs.unlink('../frontend/public/images/'+im.imgUrl, function (err) {
    if (err) throw err;
    // console.log('File deleted!');
  });

  const img = await Image.findByIdAndUpdate(req.body.id, {
      imgUrl: imgid
  })
  res.json(img)
})





router.put('/editimage', fetchuser, async (req, res) => {
  const img = await Image.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      // imgUrl: imgid
  })
  res.json(img)
})

router.post('/addimage' , fetchuser ,async (req, res) => {
  console.log( "req.------>", req.file)
    const newImage = await Image.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        imgUrl: imgid,
        user:verifieduser.id
    })
    res.json(newImage)
    // console.log()

})
// fetch data using the aggregation pipline service.
router.post('/fetchimages', fetchuser, async (req, res) => {
    const img = await Image.aggregate([
        // { $match : { 'title' : 'Sea' } },
        { $match : { user : ObjectId(verifieduser.id) } },
    ])
    res.json(img)
    // console.log(verifieduser.id);
    });
// data fetch using simple find function.
// 
// router.post('/fetchimages', fetchuser ,async (req, res) => {
//     // const img = await Image.find({user : verifieduser.id});
//     res.json(img)
// })
router.delete('/deleteimage',fetchuser, async (req, res) => {
  const im = await Image.findById(req.body.id)
  console.log(im.imgUrl)
  fs.unlink('../frontend/public/images/'+im.imgUrl, function (err) {
    if (err) throw err;
    console.log('File deleted!');
  });

    const img = await Image.findByIdAndDelete(req.body.id)
    // console.log(img)
    res.json(img)
})
module.exports = router