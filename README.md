# OC-Project-7

A social media application using the MERN stack

To launch the project clone the repository and then in the terminal navigate to the front folder and type: 
- npm install, then
- npm start

Once the front end of the application has been installed navigate to the back folder in the terminal and type:
- npm install, then
- nodemon server

By default the server is set to run on port 3001.

Open the .env file at the root of the back folder and add your database URL and secret phrase:

DB_URL = your URL here
SECRET_PHRASE = your secret phrase here

Add the database URL including your login details to give the back end access to your database. If you have been provided access to an existing database add the URL you have been given here.
Choose a secret phrase that is to be stored as part of the JSON web token. For ideas on how to choose a phrase see: https://xkcd.com/936/
