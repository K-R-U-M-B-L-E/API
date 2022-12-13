let ObjectId = require('mongodb').ObjectId;

//SEARCH ALL ASSOCIATIONS DOCUMENT
const {
  ASSOCIATIONS_COLLECTION,
  PROJECTS_COLLECTION,
} = require('../databases/mongoDB');

async function search(pipeline) {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    collection.aggregate(pipeline).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ associations: items });
    });
  });
}

//GET DISTINCT VALUE FOR A FIELD
async function getFieldValue(props) {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    collection.distinct(props, (err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve(items);
    });
  });
}

//SEARCH IN ALL PROJECTS DOCUMENT
async function searchProject(pipeline) {
  let collection = await PROJECTS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    collection.aggregate(pipeline).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ associations: items });
    });
  });
}

//GET DISTINCT VALUE FOR A FIELD OF PROJECT
async function getFieldValueProject(props) {
  let collection = await PROJECTS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    collection.distinct(props, (err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve(items);
    });
  });
}

module.exports = { search, getFieldValue, searchProject, getFieldValueProject };
