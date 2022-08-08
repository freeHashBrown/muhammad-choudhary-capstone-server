const router = require('express').Router();

const postsController = require('../controllers/postsController.js');

router.route('/').get(postsController.index);


module.exports = router;