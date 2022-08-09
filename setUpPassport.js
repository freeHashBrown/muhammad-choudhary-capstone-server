const LocalStrategy = require('passport-local').Strategy;
const knex = require('knex')(require('./knexfile.js').development);
const bcrypt = require("bcryptjs");

//Setting up passport
module.exports = function(passport) {

    //Using the local strategy from passport.js
    passport.use(
        new LocalStrategy((username, password, done) => {

            //Find the user in the database
            knex("users")
            .where({username: username})
            .then((user) => {

                //if user is not found
                if (!user.length){
                    return done(null, false);
                }

                //if user is found
                //check passwords
                bcrypt.compare(password, user[0].password, (err, result) => {


                    //If the result is true
                    if (result === true) {

                        return done(null, user[0]);
                    }
                    //if the comparison failed
                    else {
                        console.log(user[0].username, "is the username");

                        return done(null, false);
                    }
                })
            });

        })
    )

    //Serialized user function stores a cookie inside the browser
    //Take the user we got from the local strategy and store the username inside of the cookie
    passport.serializeUser((user, done) => {
        //Store only the user id in session
        done(null, user.id)
    });

    passport.deserializeUser((userId, done) => {
      
        // Query user information from the database for currently authenticated user
        knex('users')
          .where({ id: userId })
          .then(user => {
      
            //knex returns an array, therefore we must only select the first object in array
            done(null, user[0]);
          })
          .catch(err => {
            console.log('Error finding user', err);
          });
    });

};

