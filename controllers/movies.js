const path = require('path');
const Movie = require('../model/movies');
var Datastore = require('nedb');

let moviesDB = new Datastore({ filename: 'movies.db', autoload: true, timestampData: true});

// desc      Get all movie
// route     GET /api/v1/movies
// access    Public
exports.getMovies = async (req, res, next) => {
  moviesDB.find({}, function (err, docs) {
    if(err === null){
      res.status(201).json({
        success: true,
        message: docs.length === 0 ? "No Data present in DB" : "All movie found successfully",
        count: docs.length,
        data: docs
      });
    }
    else
    {
      res.status(500).json({
        success: false,
        message: err,
        data: {}
      });
    }
  });
}


// desc      Create new movie
// route     POST /api/v1/movies
// access    Private
// Request body is
    // {
    //   "title": "First Movie",
    //   "Description": "Describe the movie",
    //   "Duration": "3 hours",
    //   "Cast": ["abc", "cde", "xyz"]
    // }

exports.createMovies = async (req, res, next) => {
  movieInfo = req.body;
  if((typeof movieInfo['title'] !== 'undefined' &&  typeof movieInfo['duration'] !== 'undefined' && typeof movieInfo['description'] !== 'undefined' && typeof movieInfo['cast'] !== 'undefined')){
    moviesDB.insert(movieInfo, function(err, docs) {
      if(err === null){
        res.status(201).json({
          success: true,
          message: "New movie added successfully",
          data: docs
        });
      }
      else{
        res.status(500).json({
          success: false,
          message: err,
          data: {}
        });
      }
    });
  }
  else{
    res.status(400).json({
      success: false,
      message: 'You have missed a mendatory fields. Please enter value and try again',
      data: {}
    });
  }
};

