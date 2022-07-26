# OC-Project-7

A social media application using the MERN stack

To launch the project clone the repository and then in the terminal navigate to the front folder and type: 
- npm install, then
- npm start

Once the front end of the application has been installed navigate to the back folder in the terminal and type:
- npm install, then
- nodemon server

By default the server is set to run on port 3001.

Create an .env file at the root of the back folder with the following constants:
PORT = 
DB_URL = 
SECRET_PHRASE = 

Set the port to anything other than 3000 as this is where React will run the front end.
Add the database URL including your login details to give the back end access to your database. If you have been provided access to an existing database add the URL you have been given here.
Choose a secret phrase that is to be stored as part of the JSON web token. For ideas on how to choose a phrase see: https://xkcd.com/936/
