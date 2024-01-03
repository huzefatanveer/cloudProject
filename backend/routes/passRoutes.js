const express = require('express');
const passController = require('../controllers/passController');

const router = express.Router();

router.get('/passes', passController.getPasses);
router.post('/passes', passController.addPass);
router.put('/passes/:id', passController.updatePass);
router.delete('/passes/:id', passController.deletePass);

module.exports = router;
