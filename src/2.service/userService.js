const repository = require('../3.repository/userRepository');
const { isUserFields, isThereMandatoryFields } = require('../utils/utilsUser');
const { isJsonValid, isJsonEmpty } = require('../utils/utils');
const { json } = require('express');
var ObjectId = require('mongodb').ObjectId;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../4.model/user');

const config = require('../config.json');
cookieParser = require('cookie-parser');

//GET ALL THE USERS
async function getAll() {
  var response = await repository.getAll();
  return response;
}

//GET A SINGLE USER BY ID
//Check: - if id is valid => return err
//       - if body is empty => return not found
async function getSingle(req) {
  if (!ObjectId.isValid(req.params.id)) {
    return { err: 'ObjectId invalid' };
  }

  var response = await repository.getSingle(req);
  if (response.user === undefined || response === null) {
    return { err: 'Not found' };
  } else return response;
}

//GET A SINGLE USER BY ID
//Check: - if id is valid => return err
//       - if body is empty => return not found
async function getByEmail(req) {
  var response = await repository.getByEmail(req);
  if (response.user === undefined || response === null) {
    return { err: 'Not found' };
  } else return response;
}

//ADD A SINGLE USER
//Check : - if mandatory fields are presents => return exception
//        - if every fields presents is an acceptable fields => return exception
//        - if a user with same email alreday exists => return error
async function addSingle(req) {
  var [mandatoryFields, absentField] = isThereMandatoryFields(req.body);
  if (!mandatoryFields) {
    return { exception: `Mandatory field ${absentField} is missing` };
  }

  var [fieldsLegitimate, incorrectField] = isUserFields(req.body);
  if (!fieldsLegitimate) {
    return { exception: `Wrong field name ${incorrectField}` };
  }

  var isAlreadyExisting = await getByEmail({
    params: { email: req.body.email },
  });
  if (isAlreadyExisting.hasOwnProperty('user')) {
    return { err: `User with this email already exists` };
  }

  var hash = await bcrypt.hash(req.body.password, 5);
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hash,
    credential: 'member',
  });

  try {
    var response = await repository.addSingle(user);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}

//ADD A SINGLE USER
//Check : - if mandatory fields are presents => return exception
//        - if every fields presents is an acceptable fields => return exception
//        - if a user with same email alreday exists => return error
async function addAdmin(req) {
  var [mandatoryFields, absentField] = isThereMandatoryFields(req.body);
  if (!mandatoryFields) {
    return { exception: `Mandatory field ${absentField} is missing` };
  }

  var [fieldsLegitimate, incorrectField] = isUserFields(req.body);
  if (!fieldsLegitimate) {
    return { exception: `Wrong field name ${incorrectField}` };
  }

  var isAlreadyExisting = await getByEmail({
    params: { email: req.body.email },
  });
  if (isAlreadyExisting.hasOwnProperty('user')) {
    return { err: `User with this email already exists` };
  }

  var hash = await bcrypt.hash(req.body.password, 5);
  const user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hash,
    crdential: 'admin',
  });

  try {
    var response = await repository.addSingle(user);
    return response;
  } catch (err) {
    console.error(err);
    return err;
  }
}

//UPDATE A SINGLE USER
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

  var [fieldsLegitimate, incorrectField] = isUserFields(req.body);
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

//DELETE A SINGLE USER
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

async function login(req) {
  var response = await repository.getByEmail({
    params: { email: req.body.email },
  });
  if (response.user === undefined || response === null) {
    return { err: `No user with this email` };
  }

  var similarPassword = await bcrypt.compare(
    req.body.password,
    response.user.password
  );
  if (!similarPassword) {
    return { exception: `Incorrect Password` };
  } else {
    const token = jwt.sign({ userId: response.user._id }, config.secret, {
      expiresIn: config.tokenLife,
    });
    repository.updateSingle({
      params: { id: response.user._id },
      body: { token: token },
    });

    return {
      response: {
        id: response.user._id,
        status: 'Logged In',
        credential: response.user.credential,
      },
      token: token,
    };
  }
}

async function loginWithToken(req) {
  var response = await repository.getByToken({
    params: { token: req.body.token },
  });
  if (response.user === undefined || response === null) {
    return { err: `Invalid token` };
  } else {
    return {
      id: response.user._id,
      status: 'Logged In',
      credential: response.user.credential,
    };
  }
}

module.exports = {
  getAll,
  getSingle,
  getByEmail,
  addSingle,
  deleteSingle,
  updateSingle,
  login,
  loginWithToken,
};
