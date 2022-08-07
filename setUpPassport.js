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

                //if error found
                // if (err) {
                //     throw err;
                // }

                //if user is not found
                if (!user.length){
                    return done(null, false);
                }

                //if user is found
                //check passwords
                bcrypt.compare(password, user[0].password, (err, result) => {

                    //If there is an error
                    // if(err){
                    //     throw err;
                    // }

                    //If the result is true
                    if (result === true) {
                        return done(null, user[0]);
                    }
                    //if the comparison failed
                    else {
                        return done(null, false);
                    }
                })
            });


        })
    )

    //Serialized user function stores a cookie inside the browser
    //Take the user we got from the local strategy and store the username inside of the cookie
    passport.serializeUser((user, cb) => {
        //Store only the user id in session
        cb(null, user.id)
    });

    passport.deserializeUser((id, cb) => {

        //Look through database
        knex("users")
        .where({id: userId})
        .then(user => {
            done(null, user[0]);
        })
        .catch(err => {
            console.log("Error finding user", err);
        })
    })

};





// //This will set up the passport
// exports.setUpPassport = (passport) => {

//     //Using the local strategy from passport.js
//     passport.use(new LocalStrategy(async (username, password, done) => {

//         //First find the user in the database
//         knex('users')
//         .where({username: username})
//         .then((user) => {

//             //Place in try and catch block if error thrown
//             try {

//             //knex returns an array of user
//             //we will just take the first one 
//             const singleUser = user[0];


//             //If the user is not found
//             if (!singleUser) {
//                 return done(null, false);
//             }

//             //Check if the password matches
//             const isPasswordCorrect = bcrypt.compareSync(password, singleUser.password);

//             //If password is incorrect
//             if (!isPasswordCorrect) {
//                 return done(null, false);
//               }

//             return done(null, singleUser);
                
//             } catch (error) {
//                 return done(false, error);
//             }

//         })
//     }))


//     //Serialize and Deserilize user
//     passport.serializeUser((user, done) => {
//         done(null, user[0].id)
//     })

//     passport.deserializeUser(async (id, done) => {
//         try {
            
//             knex("users")
//             .where({id: id})
//             .then(user => {
//                 done(null, user[0])
//             })

//         } catch (error) {
//             done(error, false);
//         }
//     })
// };