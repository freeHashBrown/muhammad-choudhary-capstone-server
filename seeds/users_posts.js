// A library for generating mock data
const casual = require('casual');

exports.seed = function(knex) {
  // First, delete all posts from the table
  return knex('posts')
    .del()
    .then(() => {
      // Next delete a mock user
      return knex('users')
        .del()
        .where({ username: 'john123' });
    })
    .then(() => {
      // Then create a mock user (so we have more than one account for testing posts)
      return knex('users')
        .insert({ 
          google_id: "",
          avatar_url: "",
          username: 'john123',
          password: ""
        });
    })
    .then(()=> {
      return knex('users')
        .insert({ 
          google_id: "",
          avatar_url: "",
          username: 'Hash123',
          password: "$2a$10$6fr3Ww/YeBAPAI3tlyseYOz3VdIoekqBJ2zpcNj9wt3cMtyySzYNa"
        });
    })
    .then(() => {

      let mockPosts = [];

      for (let i = 0; i < 3; i++) {
        mockPosts.push({
          user_id: 1,
          title: casual.title,
          content: casual.sentences(5)
        });
      }
        // Insert mock posts into the table
        return knex('posts').insert(mockPosts);
    }
    
    
    )
};
