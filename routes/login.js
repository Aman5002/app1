const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecret';
  let success = false;
  // 
// 
// creating a user
router.post('/createuser', async (req, res) => {
    let users = await User.findOne({email: req.body.email});
    if (users) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
newuser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass
})
const data = {
    user: {
      id: newuser.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  success = true;
    res.json({success ,authtoken});
})
// 
// crating a login request.
router.post('/userlogin', async (req, res) => {
let user = await User.findOne({email: req.body.email});
if (!user) return res.status(404).json({error: "please login with correct username and password"});
const passwordCompare = await bcrypt.compare(req.body.password, user.password);
if(!passwordCompare) {
  success = false
  return res.status(404).json({success , error: "please login with correct password"});}
const data = {
    user: {
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  success = true
    res.json({success , authtoken});
})
module.exports = router;
