const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const Image = require('../models/image');
const User = require('../models/user');
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
    cb(null, file.originalname + '-' + Date.now() + '-' + path.extname(file.originalname))
  },
})
const upload = multer({ storage: storage })
let imgid = null
router.post('/image', upload.single('file'), function (req, res) {
  imgid = req.file.filename
  res.json({})
})
router.put('/edim', fetchuser, async (req, res) => {
  const im = await Image.findById(req.body.id)
  fs.unlink('../frontend/public/images/' + im.imgUrl, function (err) {
    if (err) throw err;
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
  })
  res.json(img)
})
router.post('/addimage', fetchuser, async (req, res) => {
  const newImage = await Image.create({
    title: req.body.title,
    description: req.body.description,
    tag: req.body.tag,
    imgUrl: imgid,
    user: verifieduser.id
  })
  res.json(newImage)

})
router.post('/fetchimages', fetchuser, async (req, res) => {
  const img = await Image.aggregate([
    // { $match : { 'title' : 'Sea' } },
    { $match: { user: ObjectId(verifieduser.id) } },
  ])
  res.json(img)
});
 

router.get('/fetchuser' , fetchuser, async (req, res) => {
const user = await User.findById(verifieduser.id)
res.json(user.email)
});


router.delete('/deleteimage', fetchuser, async (req, res) => {
  const im = await Image.findById(req.body.id)
  fs.unlink('../frontend/public/images/' + im.imgUrl, function (err) {
    if (err) throw err;
  });

  const img = await Image.findByIdAndDelete(req.body.id)
  res.json(img)
})
module.exports = router