const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/login')
   .get((req,res)=>{res.send('Login')})
   .post(authController.loginUser);

router.route('/signup')
   .get((req,res)=>{res.send('Signup')})
   .post(authController.signup);

module.exports = router;
