var express = require('express');
var router = express.Router();

let authenticate = require('./../lib/authenticate');

let balancedController = require('./../controller/balancedController');

router.post('/balanced', authenticate.verifyToken, balancedController.check);

module.exports = router;