const knex = require('knex')(require('../knexfile').development);

exports.index = (_req, res) => {
//   knex('posts')
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) =>
//       res.status(400).send(`Error retrieving Inventories: ${err}`)
//     );


    knex
        .select(
            "posts.id",
            "posts.user_id",
            "posts.title",
            "posts.content",
            "posts.updated_at",
            "users.id",
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