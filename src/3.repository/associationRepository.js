const ObjectId = require('mongodb').ObjectId;
//GET ALL ASSOCIATIONS DOCUMENT
const { ASSOCIATIONS_COLLECTION } = require('../database/database');

async function getAll() {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    if (process.env.TEST) {
      console.log('[TEST] AssociationRepository.getAll()');
    }

    collection.find().toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ associations: items });
    });
  });
}

//GET ALL VISIBLE ASSOCIATIONS DOCUMENT
async function getVisible() {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    if (process.env.TEST) {
      console.log('[TEST] AssociationRepository.getVisible()');
    }
    collection.find({ visible: true }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ associations: items });
    });
  });
}

//GET ALL INVISIBLE ASSOCIATIONS DOCUMENT
async function getInvisible() {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    if (process.env.TEST) {
      console.log('[TEST] AssociationRepository.getInvisible()');
    }
    collection.find({ visible: false }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ associations: items });
    });
  });
}

//GET AN ASSOCIATION DOCUMENT BY ID
async function getSingle(req) {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    if (process.env.TEST) {
      console.log('[TEST] AssociationRepository.getSingle()');
    }
    const id = req.params.id;
    collection.find({ _id: ObjectId(`${id}`) }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ association: items[0] });
    });
  });
}

//GET AN ASSOCIATION DOCUMENT BY NAME
async function getByName(req) {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    if (process.env.TEST) {
      console.log('[TEST] AssociationRepository.getByName()');
    }
    const name = req.params.name;
    collection.find({ name: `${name}` }).toArray((err, items) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ association: items[0] });
    });
  });
}

//ADD AN ASSOCIATION DOCUMENT
async function addSingle(req) {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    if (process.env.TEST) {
      console.log('[TEST] AssociationRepository.addSingle()');
    }
    const newAssociation = req.body;

    collection.insertOne(newAssociation, (err, result) => {
      if (err) {
        console.error(err);
        reject({ err: err });
      }
      resolve({ response: result });
    });
  }).catch((err) => {
    console.error(err);
  });
}

//UPDATE AN ASSOCIATION DOCUMENT
async function updateSingle(req) {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  return new Promise(function (resolve, reject) {
    if (process.env.TEST) {
      console.log('[TEST] AssociationRepository.updateSingle()');
    }
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

//DELETE AN ASSOCIATION DOCUMENT
async function deleteSingle(req) {
  let collection = await ASSOCIATIONS_COLLECTION.getCollection();
  const id = req.params.id;
  return new Promise(function (resolve, reject) {
    if (process.env.TEST) {
      console.log('[TEST] AssociationRepository.deleteSingle()');
    }
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
  getVisible,
  getInvisible,
  getSingle,
  getByName,
  addSingle,
  deleteSingle,
  updateSingle,
};
