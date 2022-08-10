const router = require('express').Router();

const postsController = require('../controllers/postsController.js');

//Retrieving all posts
router.route('/').get(postsController.index);

//Creating a new post
router.route('/').post(postsController.addPost);


//Retrieving specific posts
router.route("/:id").get(postsController.userPosts);

//Editing a post
router.route('/:id').put(postsController.updatePosts);

//Deleting a post 
router.route("/:id").delete(postsController.deletePosts);

module.exports = router;