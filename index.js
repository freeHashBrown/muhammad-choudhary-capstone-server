//Imports 
const express = require("express");
const cors = require("cors");

const passport = require("passport");
const passportLocal = require("passport-local").Strategy;

const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const expressSession = require("express-session");

const bodyParser = require("body-parser");

// Knex instance
const knex = require('knex')(require('./knexfile.js').development);

// Require .env files for environment variables (keys and secrets)
require('dotenv').config();

//Assign Port Number
const PORT = process.env.PORT || 5050;

const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cors({
  origin: true,
  credentials: true
}))

app.use(expressSession({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}))

app.use(cookieParser(process.env.SECRET));

//Routes
app.post("/login", (req, res) => {
  console.log(req.body);
  return;
})

app.post("/signup", (req, res) => {
  
  //Look for user if exists in the database
  knex("users")
  .select("username")
  .where({username: req.body.username})
  .then(user => {
     
    //If user is found, send an error saying user already exists
    if (user.length){
      return res.status(409).send("User already exists");
    }
    else{

      //encrypt the password before storing it
      const encryptedPassword = bcrypt.hash(req.body.password, 10);

      //Create a user if not found
      knex('users')
      .insert({
        username: req.body.username,
        password: encryptedPassword
      })

      res.status(201).send("User created");
    }
      
  })


})

app.get("/user", (req, res) => {
  // console.log(req.body);
  return;
})


// start Express on port 8080
app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
});