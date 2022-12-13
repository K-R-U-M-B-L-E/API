const { response } = require('express');
const {
  isNotFound,
  isExceptionOrError,
  returnStatus,
} = require('../utils/utils');
const utils = require('../utils/utilsAssociation');
const service = require('../2.service/associationservice');
const { sleep } = require('../utils/utils');

// GET ALL ASSOCIATIONS
// Check : - if an error occured => return 500

async function getAll(req, res) {
  const response = await service.getAll();
  const statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

// GET ALL VISIBLE ASSOCIATIONS
// Check : - if an error occured => return 500

async function getVisible(req, res) {
  const response = await service.getVisible();
  const statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

// GET ALL INVISIBLE ASSOCIATIONS
// Check : - if an error occured => return 500

async function getInvisible(req, res) {
  console.log(req);
  const response = await service.getInvisible();
  const statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

// GET AN ASSOCIATION BY ID
// Check : - - if the id does not exist => return 404
//          - if an error occured => return 500

async function getSingle(req, res) {
  const response = await service.getSingle(req);
  const statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

// GET AN ASSOCIATION BY NAME
// Check : - - if the id does not exist => return 404
//          - if an error occured => return 500

async function getByName(req, res) {
  const response = await service.getByName(req);
  const statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

// ADD AN ASSOCIATION
// Check : - if an error occured => return 500
//        - if an exception on fields occured => return 500

async function addSingle(req, res) {
  const response = await service.addSingle(req);
  const statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

// UPDATE AN ASSOCIATION BY ID
// Check : - if the id does not exist => return 404
//        - if an error occured => return 500
//        - if an exception on fields occured => return 500
//        - if nothing had to be update => return 200

async function updateSingle(req, res) {
  const response = await service.updateSingle(req);
  const statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

// DELETE AN ASSOCIATION
// Check : - if the id does not exist => return 404
//        - if an error occured => return 500

async function deleteSingle(req, res) {
  const response = await service.deleteSingle(req);
  const statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

module.exports = {
  getAll,
  getVisible,
  getInvisible,
  getSingle,
  getByName,
  addSingle,
  deleteSingle,
  updateSingle,
};
