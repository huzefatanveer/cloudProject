const express = require('express');
const recipientController = require('../controllers/recipientController');

const router = express.Router();

router.get('/recipients', recipientController.getRecipients);
router.post('/recipients', recipientController.addRecipient);
router.put('/recipients/:id', recipientController.updateRecipient);
router.delete('/recipients/:id', recipientController.deleteRecipient);

module.exports = router;
