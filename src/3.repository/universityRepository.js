let ObjectId = require('mongodb').ObjectId;

//GET ALL UINVERSITIES DOCUMENT

const { UNIVERSITIES_COLLECTION } = require('../database/database');

async function getAll() {
  let collection = await UNIVERSITIES_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    collection.find().toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ universities: items });
    });
  });
}

//GET AN UNIVERSITY DOCUMENT BY ID
async function getSingle(req) {
  let collection = await UNIVERSITIES_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const id = req.params.id;
    collection.find({ _id: ObjectId(`${id}`) }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ university: items[0] });
    });
  });
}

//ADD AN UNIVERSITY DOCUMENT
async function addSingle(req) {
  let collection = await UNIVERSITIES_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const newAssociation = req.body;

    collection.insertOne(newAssociation, (err, result) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ response: result });
    });
  });
}

//UPDATE AN UNIVERSITY DOCUMENT
async function updateSingle(req) {
  let collection = await UNIVERSITIES_COLLECTION.getCollection();
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

//DELETE AN UNIVERSITY DOCUMENT
async function deleteSingle(req) {
  let collection = await UNIVERSITIES_COLLECTION.getCollection();
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

module.exports = { getAll, getSingle, addSingle, deleteSingle, updateSingle };
