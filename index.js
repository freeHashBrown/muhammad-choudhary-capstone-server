// initialize Express in project
const express = require('express');
const app = express();

const passport = require('passport');
const passportLocal = require("passport-local").Strategy;
const cors = require("cors");

const cookieParser = require('cookie-parser');
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');

const expressSession = require('express-session');

//Using the dotenv file 
require('dotenv').config();



//Middlewares
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSession({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true

}))

app.use(cookieParser(process.env.SECRET));



// Knex instance
const knex = require('knex')(require('./knexfile.js').development);

//Routes to register, login and get user info
app.post("/register", (req, res) => {

    username = req.body.username;
    
    //Must encrypt the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  //Create the user and insert it into database
  knex('users')
  .insert({
    username: username,
    password: hashedPassword,
    avatar_url: "local strategy"
  })
  .then(() => {
    res.status(201).send('Registered successfully');
  })
  .catch(err => {
    res.status(400).json({ message: 'Failed registration', error: err.sqlMessage });
  })

});

app.post("/login", (req, res) => {
    console.log(req.body);
});

app.get("/user", (req, res) => {
    console.log(req.body);
})




// start Express on port 8080
app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
});