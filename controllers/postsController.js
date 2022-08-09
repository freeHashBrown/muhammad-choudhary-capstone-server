const knex = require('knex')(require('../knexfile').development);

//Joining posts + users table and sending it back
exports.index = (_req, res) => {

    knex
        .select(
            "posts.id",
            "posts.title",
            "posts.content",
            "posts.updated_at",
            "users.id as user_id",
            "users.username as username"
        )
        .from("posts")
        .leftJoin("users", "posts.user_id", "users.id")
        .orderBy("posts.id", "desc")
        .then((data) => {
                  res.status(200).json(data);
                })
                .catch((err) =>
                  res.status(400).send(`Error retrieving posts: ${err}`)
                );
};

// Creating a new post and inserting it into database
exports.addPost = (req, res) => {

    //Validate the post being sent
    if (!req.body.user_id || !req.body.title || !req.body.content) {
        return res.status(400).send('Please make sure to provide user_id, title, and content fields in a request');
    }

    //Insert the data 
    knex("posts")
        .insert(req.body)
        .then(data => {

            //After posting, respond with all the data
            res.status(201).json(data);

        })
}