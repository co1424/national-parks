const express = require('express');
const router = new express.Router();
const parksController = require('../controllers/parksController.js');
const { parkValidationRules, validate } = require('../validation/validator.js');
// Body-parser middleware before validation middleware
router.use(express.json());


// Creates a new National Park 
router.post('/park', parkValidationRules(), validate, parksController.createPark);
// Gets all the National Parks in the API 
router.get('/national-parks', parksController.getAllNationalParks);
// Gets a single National Park by id
router.get('/park/:id', parksController.getNationalParkById);
// PROTECTED ROUTES ARE LOCATED AT SERVER.JS.


module.exports = router;