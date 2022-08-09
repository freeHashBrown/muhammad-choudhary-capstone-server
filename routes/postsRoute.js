const router = require('express').Router();

const postsController = require('../controllers/postsController.js');

//Retrieving all posts
router.route('/').get(postsController.index);

//Creating a new post
router.route('/').post(postsController.addPost);


module.exports = router;