let ObjectId = require('mongodb').ObjectId;
const { USERS_COLLECTION } = require('../database/database');

//GET ALL UINVERSITIES DOCUMENT
async function getAll() {
  let collection = await USERS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    collection.find().toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ users: items });
    });
  });
}

//GET AN USER DOCUMENT BY ID
async function getSingle(req) {
  let collection = await USERS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const id = req.params.id;
    collection.find({ _id: ObjectId(`${id}`) }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ user: items[0] });
    });
  });
}

//GET AN USER DOCUMENT BY EMAIL
async function getByEmail(req) {
  let collection = await USERS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const email = req.params.email;
    collection.find({ email: email }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ user: items[0] });
    });
  });
}

//GET AN USER DOCUMENT BY TOKEN
async function getByToken(req) {
  let collection = await USERS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const token = req.params.token;
    collection.find({ token: token }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ user: items[0] });
    });
  });
}

//ADD AN USER DOCUMENT
async function addSingle(user) {
  let collection = await USERS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    collection.insertOne(user, (err, result) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ response: result });
    });
  });
}

//UPDATE AN USER DOCUMENT
async function updateSingle(req) {
  let collection = await USERS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const id = req.params.id;
    var newvalues = { $set: req.body };

    collection.updateOne(
      { _id: ObjectId(`${id}`) },
      newvalues,
      (err, result) => {
        if (err) {
          console.error(err);
          reject({ err: err });
        }
        resolve({ response: result });
      }
    );
  });
}

//DELETE AN USER DOCUMENT
async function deleteSingle(req) {
  let collection = await USERS_COLLECTION.getCollection();
  const id = req.params.id;
  return new Promise(function (resolve, reject) {
    collection.deleteOne({ _id: ObjectId(`${id}`) }, (err, result) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ response: result });
    });
  });
}

module.exports = {
  getAll,
  getSingle,
  getByEmail,
  getByToken,
  addSingle,
  deleteSingle,
  updateSingle,
};
