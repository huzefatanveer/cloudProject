const express = require('express');
const tollGateController = require('../controllers/tollGateController');

const router = express.Router();

router.get('/tollgates', tollGateController.getTollGates);
router.post('/tollgates', tollGateController.addTollGate);
router.delete('/tollgates/:id', tollGateController.deleteTollGate);

module.exports = router;
