const { response } = require('express');
const { returnStatus } = require('../utils/utils');
const service = require('../2.service/searchService');

//SEARCH ASSOCIATION ON FILTER
//Check : - if an error occured => return 500

async function search(req, res) {
  var response = await service.search(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//SEARCH KEY OF AN ASSOCIATION DOCUMENT
//Check : - if an error occured => return 500

async function searchKey(req, res) {
  var response = await service.searchKey(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

//TEST ENVIRONMENT ONLY
async function testsearch(req, res) {
  var response = await service.testsearch(req);
  var statusCode = returnStatus(response);
  res.status(statusCode).json(response);
}

module.exports = { search, searchKey, testsearch };
