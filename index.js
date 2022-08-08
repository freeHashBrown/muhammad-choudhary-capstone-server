//Imports 
const express = require("express");
const cors = require("cors");

const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");

const bodyParser = require("body-parser");
const { authenticate } = require("passport");

// Knex instance
const knex = require('knex')(require('./knexfile.js').development);

// Require .env files for environment variables (keys and secrets)
require('dotenv').config();

//Assign Port Number
const PORT = process.env.PORT || 5050;

const app = express();



//Middlewares
// Enable req.body middleware
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))

app.use(expressSession({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser(process.env.SECRET));


//Setting Up Passport
app.use(passport.initialize());
app.use(passport.session());
require("./setUpPassport")(passport);





//Routes
app.post("/login", (req, res, next) => {
  
  //authenticate user using local strategy 
  passport.authenticate("local", { failureRedirect: '/login' }, (err, user) => {

    //Throw an error found
    if (err) {
      throw err;
    }

    if (!user) {
      res.send("Could not find user");
    }

    else {
      req.logIn(user, err => {
        if (err) {
          throw err;
        }

        res.send("Login Success");
        
        
      })
    }
  })(req,res,next)

});

app.post("/signup", (req, res) => {
  
  username = req.body.username;

    //Must encrypt the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  //Create the user and insert it into database
  knex('users')
  .insert({
    username: username,
    password: hashedPassword
  })
  .then(() => {
    res.status(201).send('Registered successfully');
  })
  .catch(err => {
    res.status(400).json({ message: 'Failed registration', error: err.sqlMessage });
  })
});

//After the user authenticated, the user is stored in the req.user
app.get("/user", (req, res) => {

  // console.log("/user endpoint being reached*****");
  console.log(req.user, req.session);
  
   // If `req.user` isn't found send back a 401 Unauthorized response
   if (req.user === undefined) return res.status(401).json({ message: 'Unauthorized' });

   // If user is currently authenticated, send back user info
   res.status(200).json(req.user);
});

// Logout endpoint
app.get('/logout', (req, res) => {
  // Passport adds the logout method to request, it will end user session
  req.logout((error) => {
      // This callback function runs after the logout function
      if (error) {
          return res.status(500).json({message: "Server error, please try again later", error: error});
      }
      // Redirect the user back to client-side application
      res.redirect("http://localhost:3000/");
  });
});





// start Express on port 8080
app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
});