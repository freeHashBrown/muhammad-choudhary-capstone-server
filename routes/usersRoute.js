const router = require('express').Router();

const usersController = require('../controllers/usersController.js');

//Retrieving all users
router.route('/').get(usersController.index);


module.exports = router;