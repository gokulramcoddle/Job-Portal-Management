const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/verifyTokenMiddleware');
const userController = require('../controllers/userController');

router.get('/', tokenVerify, userController.usersData);
router.get('/:userID',tokenVerify, userController.getUserById);
router.put('/update/:userID', tokenVerify, userController.editData);
router.delete('/delete/:userID', tokenVerify, userController.deleteData);

module.exports = router;