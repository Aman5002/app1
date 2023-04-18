const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId; 
const Image = require('../models/image');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { verify } = require('jsonwebtoken');


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

// router.post('/image', upload.single('file'), function (req, res) {
//   console.log("fileeeee--->",req.file)
//   res.json({})
// })



router.post('/addimage' , fetchuser, upload.single('file') ,async (req, res) => {
  console.log( "req.------>", req.file)
    const newImage = await Image.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        // imgUrl: req.file.filename,
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
router.put('/editimage', fetchuser, async (req, res) => {
    const img = await Image.findByIdAndUpdate(req.body.id, {
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        imgUrl: req.body.imgUrl
    })
    res.json(img)
})
router.delete('/deleteimage',fetchuser, async (req, res) => {
    const img = await Image.findByIdAndDelete(req.body.id)
    res.json(img)
})
module.exports = router