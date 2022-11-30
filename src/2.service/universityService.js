const repository = require('../3.repository/universityRepository');
const {
  isUniversityField,
  isThereMandatoryFields,
} = require('../utils/utilsUniversity');
const { isJsonValid, isJsonEmpty } = require('../utils/utils');
const { json } = require('express');
var ObjectId = require('mongodb').ObjectId;

//GET ALL THE UINVERSITIES
async function getAll() {
  var response = await repository.getAll();
  return response;
}

//GET A SINGLE UNIVERSITY BY ID
//Check: - if id is valid => return err
//       - if body is empty => return not found
async function getSingle(req) {
  if (!ObjectId.isValid(req.params.id)) {
    return { err: 'ObjectId invalid' };
  }

  var response = await repository.getSingle(req);
  if (response.university === undefined || response === null) {
    return { err: 'Not found' };
  } else return response;
}

//ADD A SINGLE UNIVERSITY
//Check : - if mandatory fields are presents => return exception
//        - if every fields presents is an acceptable fields => return exception
async function addSingle(req) {
  var [mandatoryFields, absentField] = isThereMandatoryFields(req.body);
  if (!mandatoryFields) {
    return { exception: `Mandatory field ${absentField} is missing` };
  }

  var [fieldsLegitimate, incorrectField] = isUniversityField(req.body);
  if (!fieldsLegitimate) {
    return { exception: `Wrong field name ${incorrectField}` };
  }

  try {
    var response = await repository.addSingle(req);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}

//UPDATE A SINGLE UNIVERSITY
//Check : - if id is valid  => return err
//        - if id exists => return not found
//        - if Json is empty => return without err
//        - if every fields presents is an acceptable fields => return exception
//        - if modification had been done => return without err
async function updateSingle(req) {
  if (!ObjectId.isValid(req.params.id)) {
    return { err: 'ObjectId invalid' };
  }
  if (getSingle(req) === { err: 'Not found' }) {
    return { err: 'Not Found' };
  }
  if (isJsonEmpty(req.body)) {
    return { status: 'Nothing to update' };
  }

  var [fieldsLegitimate, incorrectField] = isUniversityField(req.body);
  if (!fieldsLegitimate) {
    return { exception: `Wrong field name ${incorrectField}` };
  }

  try {
    var response = await repository.updateSingle(req);
    if (response.response.modifiedCount === 0) {
      return { status: 'Nothing to update' };
    }
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}

//DELETE A SINGLE UNIVERSITY
//Check: - if id is invalid => return err
//       - if something had been deleted => return not found
async function deleteSingle(req) {
  if (!ObjectId.isValid(req.params.id)) {
    return { err: 'ObjectId invalid' };
  }

  var response = await repository.deleteSingle(req);
  if (response.response.deletedCount === 0) {
    return { err: 'Not found' };
  }
  return response;
}

module.exports = { getAll, getSingle, addSingle, deleteSingle, updateSingle };
