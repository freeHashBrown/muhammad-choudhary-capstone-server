
# Learning Platform (Server)

An online learning platform that teachers could use to post lessons, 
quizzes and assignments. 
They can also message their students directly to interact with them one on one. 
There will also be a space where students can post. 
Other students can also search through and upvote these posts. 

# Instructions
Clone the git repo into a folder.   
Please update the knexfile.js with your database name, password and username.   
Once you have the database set up.   

Create a .env file with the variables SECRET and PORT.  
There is a env_sample file for your reference.  
    
IMPORTANT:
Make sure the PORT environment variable is set to 8080 because the client makes axios request to that port



Open the terminal and run these commands in sequence:    
npm run migrate    
npm run seed   
npm run start        

# Login
You can login with this username and password:

username: Hash123
password: 123

Their is a bug in the register endpoint that prevents a user from registering.   
I have to complete that feature.


# Endpoints
Get "/users" will get all the users

Get "/posts" will get all the posts

Post "/posts" will create a new post

Get "posts/id" will retrieve a specific post of a user

Put "posts/id" will edit a specific post

Delete "posts/id" will delete a specific post

Get "/user" will retrieve the logged in user

Get "/logout" will logout a user

Get "/login" will login a user

Get "/signup" will signup a user

# Lessons learned & next steps
The passport.js local strategy is very complex and it must be 
studied further. I want to add Google, Github and Facebook login.
I also want to complete the register feature for passport.js

I also want to add a feature of instant messaging with Socket.io.

# Tech Stack used   
Express.js    
MySQL          
Node.js      





