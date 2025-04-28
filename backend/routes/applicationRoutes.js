const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/verifyTokenMiddleware');
const applicationController = require('../controllers/applicationController');

router.get('/', tokenVerify, applicationController.usersApplication);
router.get('/:userID', tokenVerify, applicationController.getApplicationById); 
router.post('/add', tokenVerify, applicationController.postApplication);
router.put('/update', tokenVerify, applicationController.updateJobStatus);
router.delete('/delete/:ID', tokenVerify, applicationController.deleteApplication);

module.exports = router;