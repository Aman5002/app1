const express = require('express');
const Image = require('../models/image');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
router.post('/addimage', fetchuser ,async (req, res) => {
    const newImage = await Image.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        imgUrl: req.body.imgUrl,
        user:verifieduser.id
    })
    res.json(newImage)
})
router.post('/fetchimages', fetchuser ,async (req, res) => {
    const img = await Image.find({user : verifieduser.id});
    res.json(img)
})
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