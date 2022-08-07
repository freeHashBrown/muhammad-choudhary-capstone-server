const LocalStrategy = require('passport-local').Strategy;
const knex = require('knex')(require('./knexfile.js').development);
const bcrypt = require("bcryptjs");

//This will set up the passport
exports.setUpPassport = (passport) => {

    //Using the local strategy from passport.js
    passport.use(new LocalStrategy(async (username, password, done) => {

        //First find the user in the database
        knex('users')
        .where({username: username})
        .then((user) => {

            //Place in try and catch block if error thrown
            try {

            //knex returns an array of user
            //we will just take the first one 
            const singleUser = user[0];


            //If the user is not found
            if (!singleUser) {
                return done(null, false);
            }

            //Check if the password matches
            const isPasswordCorrect = bcrypt.compareSync(password, singleUser.password);

            //If password is incorrect
            if (!isPasswordCorrect) {
                return done(null, false);
              }

            return done(null, singleUser);
                
            } catch (error) {
                return done(false, error);
            }

        })
    }))


    //Serialize and Deserilize user
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            
            knex("users")
            .where({id: id})
            .then(user => {
                done(null, user[0])
            })

        } catch (error) {
            done(error, false);
        }
    })
};