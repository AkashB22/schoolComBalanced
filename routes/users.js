var express = require('express');
var router = express.Router();

let userController = require('./../controller/user');
let authenticate = require('./../lib/authenticate');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', userController.createUser);

router.get('/read', authenticate.verifyToken, userController.readUser);

router.put('/update', authenticate.verifyToken, userController.updateUser);

router.delete('/delete', authenticate.verifyToken, authenticate.isAdmin, userController.deleteUser);

router.post('/login', userController.loginUser);

module.exports = router;
