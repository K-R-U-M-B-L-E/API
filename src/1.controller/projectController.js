const { response } = require('express');
const { returnStatus } = require('../utils/utils');
const utils = require('../utils/utilsProject');
const service = require('../2.service/projectService');

//GET ALL PROJECTS
//Check : - if an error occured => return 500

async function getAll(req, res) {
  var response = await service.getAll();
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//GET AN PROJECT BY ID
//Check : - - if the id does not exist => return 404
//          - if an error occured => return 500

async function getSingle(req, res) {
  var response = await service.getSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//GET PROJECTS BY ASSOCIATION
//Check : - if an error occured => return 500

async function getByAsso(req, res) {
  var response = await service.getByAsso(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//ADD AN PROJECT
//Check : - if an error occured => return 500
//        - if an exception on fields occured => return 500

async function addSingle(req, res) {
  var response = await service.addSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//UPDATE AN PROJECT BY ID
//Check : - if the id does not exist => return 404
//        - if an error occured => return 500
//        - if an exception on fields occured => return 500
//        - if nothing had to be update => return 200

async function updateSingle(req, res) {
  var response = await service.updateSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//UPDATE SEVERAL PROJECT
//Check : - if the id does not exist => return 404
//        - if an error occured => return 500
//        - if an exception on fields occured => return 500
//        - if nothing had to be update => return 200

async function updateMultiple(req, res) {
  /*var response = await service.updateSingle(req);
    var statusCode = returnStatus(response)
    res.status(statusCode).json(response)*/
  return;
}

//DELETE AN PROJECT
//Check : - if the id does not exist => return 404
//        - if an error occured => return 500

async function deleteSingle(req, res) {
  var response = await service.deleteSingle(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//DELETE SEVERAL PROJECT
//Check : - if the id does not exist => return 404
//        - if an error occured => return 500

async function deleteMultiple(req, res) {
  /*var response = await service.deleteSingle(req);
    var statusCode = returnStatus(response)
    res.status(statusCode).json(response)*/
  return;
}

module.exports = {
  getAll,
  getSingle,
  getByAsso,
  addSingle,
  updateSingle,
  deleteMultiple,
  deleteSingle,
  deleteMultiple,
};
