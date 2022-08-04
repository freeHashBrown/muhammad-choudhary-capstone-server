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
        .where({ username: 'dummy-user' });
    })
    .then(() => {
      // Then create a mock user (so we have more than one account for testing posts)
      return knex('users')
        .insert({ 
          google_id: "google_id",
          avatar_url: 'wwww.google_id.com',
          username: 'google-user'
        });
    })
    .then(() => {

      let mockPosts = [];

      mockPosts.push({
        user_id: 1,
        title: casual.title,
        content: casual.sentences(5)
      });
        // Insert mock posts into the table
        return knex('posts').insert(mockPosts);
    }
    
    
    )
};
