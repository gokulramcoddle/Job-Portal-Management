const express = require('express');
const router = express.Router();
const tokenVerify = require('../middleware/verifyTokenMiddleware');
const jobController = require('../controllers/jobController');

router.get('/', tokenVerify, jobController.fetchJob);
router.get('/:ID', tokenVerify, jobController.fetchJobByID);
router.post('/add', tokenVerify, jobController.addJob);
router.put('/update/:ID', tokenVerify, jobController.editJob);
router.delete('/delete/:ID', tokenVerify, jobController.deleteJob);

module. exports = router;