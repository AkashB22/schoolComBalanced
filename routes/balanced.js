var express = require('express');
var router = express.Router();

let balancedController = require('./../controller/balancedController');

router.post('/balanced', balancedController.check);

module.exports = router;