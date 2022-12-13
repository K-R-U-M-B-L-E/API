let ObjectId = require('mongodb').ObjectId;

//GET ALL PROJECTS DOCUMENT
const { PROJECTS_COLLECTION } = require('../databases/mongoDB');

async function getAll() {
  let collection = await PROJECTS_COLLECTION.getCollection();
  console.log('getAll');
  return new Promise(function (resolve, reject) {
    collection.find().toArray((err, items) => {
      if (err) {
        console.log(err);
        console.error(err);
        reject({ err: err });
      }
      resolve({ projects: items });
    });
  });
}

//GET AN PROJECT DOCUMENT BY ID
async function getSingle(req) {
  let collection = await PROJECTS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const id = req.params.id;
    collection.find({ _id: ObjectId(`${id}`) }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ project: items[0] });
    });
  });
}

//GET AN PROJECT DOCUMENT BY ASSO ID
async function getByAsso(req) {
  let collection = await PROJECTS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const id = req.params.id;
    collection.find({ association: `${id}` }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ projects: items });
    });
  });
}

//ADD AN PROJECT DOCUMENT
async function addSingle(req) {
  let collection = await PROJECTS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const newProject = req.body;

    collection.insertOne(newProject, (err, result) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ response: result });
    });
  });
}

//UPDATE AN PROJECT DOCUMENT
async function updateSingle(req) {
  let collection = await PROJECTS_COLLECTION.getCollection();
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

//UPDATE SEVERAL PROJECT DOCUMENTS
async function updateMultiple(req) {
  let collection = await PROJECTS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    const id = req.params.id;
    var newvalues = { $set: req.body.updates };
    var filter = req.body.filter;

    collection.updateOne(filter, newvalues, (err, result) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ response: result });
    });
  });
}

//DELETE AN PROJECT DOCUMENT
async function deleteSingle(req) {
  let collection = await PROJECTS_COLLECTION.getCollection();
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

//DELETE SEVERAL PROJECT DOCUMENTS
async function deleteMultiple(req) {
  let collection = await PROJECTS_COLLECTION.getCollection();
  var filter = req.body.filter;
  return new Promise(function (resolve, reject) {
    collection.deleteMany(filter, (err, result) => {
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
  getByAsso,
  addSingle,
  updateSingle,
  updateMultiple,
  deleteSingle,
  deleteMultiple,
};
