A social media application using the MERN stack

1. To setup the project clone the repository and then navigate to the back folder and change the .env.local file to .env

2. Open the .env file and add your database URL and secret phrase:

DB_URL = your URL here

SECRET_PHRASE = your secret phrase here

Add the database URL including your login details to give the back end access to your database. If you have been provided access to an existing database add the URL you have been given here.
Choose a secret phrase that is to be stored as part of the JSON web token. For ideas on how to choose a phrase see: https://xkcd.com/936/

3. Navigate back to the root folder and run npm install in the terminal
4. From the back folder run npm install
5. From the front folder run npm install
6. Navigate to the root folder and run npm start to launch the server and the front end all in one command

By default the server is set to run on port 3001.
