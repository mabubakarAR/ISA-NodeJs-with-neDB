const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
var Datastore = require('nedb');

//Load config var
dotenv.config({path: './config/config.env'});

// let moviesDB = new Datastore({ filename: 'movies.db', autoload: true, timestampData: true});
let usersDB = new Datastore({ filename: 'users.db', autoload: true, timestampData: true});

const movies = require('./routes/movies');

const app = express();
// Body parser
app.use(express.json());

app.use('/api/v1/movies', movies);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))
