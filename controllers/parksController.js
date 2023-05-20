const parksModel = require('../models/parksModel');

const parksController = {};

// -POST REQUEST-
// Creates a new National Park 
parksController.createPark = async (req, res) => {
  try {
    console.log(`req.body: ${req.body}`);
    const newNationalPark = await parksModel.create(req.body);
    console.log(`National Park created: ${newNationalPark}`);
    res.status(201).json(newNationalPark);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// -GET REQUEST-
// Gets all the National Parks in the API 
parksController.getAllNationalParks = async (req, res) => {
  try {
    const nationalParks = await parksModel.find();
    res.status(200).json(nationalParks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -GET REQUEST-
// Gets a single National Park by id
parksController.getNationalParkById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleNationalPark = await parksModel.findById(id);
    res.status(200).json(singleNationalPark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = parksController;