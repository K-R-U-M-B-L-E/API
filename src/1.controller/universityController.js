const { response } = require('express');
const { returnStatus } = require('../utils/utils');
const utils = require('../utils/utilsUniversity');
const service = require('../2.service/universityService');

//GET ALL UNIVERSITIES
//Check : - if an error occured => return 500

async function getAll(req, res) {
  var response = await service.getAll();
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//GET AN UNIVERSITY BY ID
//Check : - - if the id does not exist => return 404
//          - if an error occured => return 500

async function getSingle(req, res) {
  var response = await service.getSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//ADD AN UNIVERSITY
//Check : - if an error occured => return 500
//        - if an exception on fields occured => return 500

async function addSingle(req, res) {
  var response = await service.addSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//UPDATE AN UNIVERSITY BY ID
//Check : - if the id does not exist => return 404
//        - if an error occured => return 500
//        - if an exception on fields occured => return 500
//        - if nothing had to be update => return 200

async function updateSingle(req, res) {
  var response = await service.updateSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//DELETE AN UNIVERSITY
//Check : - if the id does not exist => return 404
//        - if an error occured => return 500

async function deleteSingle(req, res) {
  var response = await service.deleteSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

module.exports = { getAll, getSingle, addSingle, deleteSingle, updateSingle };
