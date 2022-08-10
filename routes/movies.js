const router = require('express').Router();

const {
  createMovies,
  getMovies
} = require('../controllers/movies');


// const { protect, authorize } = require('../middleware/auth');
// const Course = require('../models/Course');
// const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(getMovies)
  .post(createMovies);

module.exports = router;
