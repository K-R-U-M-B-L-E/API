const { response } = require('express');
const {
  isNotFound,
  isExceptionOrError,
  returnStatus,
} = require('../utils/utils');
const utils = require('../utils/utilsAssociation');
const service = require('../2.service/associationservice');
const { sleep } = require('../utils/utils');

//GET ALL ASSOCIATIONS
//Check : - if an error occured => return 500

async function getAll(req, res) {
  var response = await service.getAll();
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//GET ALL VISIBLE ASSOCIATIONS
//Check : - if an error occured => return 500

async function getVisible(req, res) {
  var response = await service.getVisible();
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//GET ALL INVISIBLE ASSOCIATIONS
//Check : - if an error occured => return 500

async function getInvisible(req, res) {
  console.log(req);
  var response = await service.getInvisible();
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//GET AN ASSOCIATION BY ID
//Check : - - if the id does not exist => return 404
//          - if an error occured => return 500

async function getSingle(req, res) {
  var response = await service.getSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//GET AN ASSOCIATION BY NAME
//Check : - - if the id does not exist => return 404
//          - if an error occured => return 500

async function getByName(req, res) {
  var response = await service.getByName(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//ADD AN ASSOCIATION
//Check : - if an error occured => return 500
//        - if an exception on fields occured => return 500

async function addSingle(req, res) {
  var response = await service.addSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//UPDATE AN ASSOCIATION BY ID
//Check : - if the id does not exist => return 404
//        - if an error occured => return 500
//        - if an exception on fields occured => return 500
//        - if nothing had to be update => return 200

async function updateSingle(req, res) {
  var response = await service.updateSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//DELETE AN ASSOCIATION
//Check : - if the id does not exist => return 404
//        - if an error occured => return 500

async function deleteSingle(req, res) {
  var response = await service.deleteSingle(req);
  var statusCode = returnStatus(response);
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
