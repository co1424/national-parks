const express = require('express');
const router = new express.Router();
const parksController = require('../controllers/parksController.js');

// Creates a new National Park 
router.post('/park', parksController.createPark);
// Gets all the National Parks in the API 
router.get('/national-parks', parksController.getAllNationalParks);
// Gets a single National Park by id
router.get('/park/:id', parksController.getNationalParkById);

module.exports = router;