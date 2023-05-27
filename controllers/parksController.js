const parksModel = require('../models/parksModel');
const ObjectId = require('mongodb').ObjectId;

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

// -PUT REQUEST-
// Updates a single National Park by id
parksController.updateParkById = async (req, res) => {
  // Is the provided ID correct?
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact ID to update a National Park.');
  }
try {
  const { id } = req.params;
  const park = await parksModel.findByIdAndUpdate(id, req.body);
  // We cant find the contact by id and update it in one step
  if (!park) {
    return res.status(404).json({ error: 'National Park not found' });
  } else {
    const updatedPark = await parksModel.findById(id);
    res.status(204).json(updatedPark);
  }
} catch (err) {
  res.status(500).json({ error: err.message });
}
};

// -DELETE REQUEST-
// Deletes a single National Park by id
parksController.deleteParkById = async (req, res) => {
  // Is the provided ID correct?
if (!ObjectId.isValid(req.params.id)) {
  res.status(400).json('Must use a valid contact ID to delete a National Park.');
}
try {
  const { id } = req.params;
  const park = await parksModel.findByIdAndDelete(id);
  if (!park) {
    return res.status(404).json({ error: 'National Park not found' });
  } else {
    res.status(200).json(park);
  }
} catch (err) {
  res.status(500).json({ error: err.message });
}
};


module.exports = parksController;