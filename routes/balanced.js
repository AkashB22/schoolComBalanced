var express = require('express');
var router = express.Router();

let authenticate = require('./../lib/authenticate');

let balancedController = require('./../controller/balanced');

router.post('/balanced', authenticate.verifyToken, balancedController.check);

module.exports = router;