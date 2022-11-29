//const mongo = require("mongodb").MongoClient;
const { MongoClient } = require('mongodb');
const url =  process.env.MONGO_DB_URL;
var ObjectId = require('mongodb').ObjectId; 
let db


//CONNECT TO MONGO DB INSTANCE
mongo.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        console.error(err)
        return
      }
      db = client.db("krumble-catalogue")
      projects = db.collection("projects")
    }
  )


//GET ALL PROJECTS DOCUMENT
async function getAll()
{
    return new Promise(function(resolve, reject) {
      projects.find().toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
      resolve({projects : items});
      })
    })
}

//GET AN PROJECT DOCUMENT BY ID
async function getSingle(req)
{
    return new Promise(function(resolve, reject) {
    const id = req.params.id;
    projects.find({ _id: ObjectId(`${id}`) }).toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
        resolve({ project : items[0]})
      })
    })
}

//GET AN PROJECT DOCUMENT BY ASSO ID
async function getByAsso(req)
{
    return new Promise(function(resolve, reject) {
    const id = req.params.id;
    projects.find({ association: `${id}`}).toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
        resolve({ projects : items })
      })
    })
}

//ADD AN PROJECT DOCUMENT
async function addSingle(req)
{
  return new Promise(function(resolve, reject) {
    const newProject = req.body
    
    projects.insertOne(newProject, (err, result) => { 
        if (err) {
          console.error(err)
          reject({ err : err })
          }
        resolve({ response : result})
      })
    })
}

//UPDATE AN PROJECT DOCUMENT
async function updateSingle(req)
{
  return new Promise(function(resolve, reject) {
    const id = req.params.id
    var newvalues = { $set: req.body };
    
    projects.updateOne({ _id: ObjectId(`${id}`)}, newvalues , (err, result) => { 
        if (err) {
          console.error(err)
          reject({ err : err })
          }
        resolve({ response : result})
      })
    })
}

//UPDATE SEVERAL PROJECT DOCUMENTS
async function updateMultiple(req)
{
  return new Promise(function(resolve, reject) {
    const id = req.params.id
    var newvalues = { $set: req.body.updates };
    var filter = req.body.filter;
    
    projects.updateOne(filter, newvalues , (err, result) => { 
        if (err) {
          console.error(err)
          reject({ err : err })
          }
        resolve({ response : result})
      })
    })
}

//DELETE AN PROJECT DOCUMENT
async function deleteSingle(req)
{
  const id = req.params.id;
  return new Promise(function(resolve, reject) {

    projects.deleteOne({ _id: ObjectId(`${id}`) }, (err, result) => { 
      if (err) {
        console.error(err)
        reject({ err: err })
      }
      resolve({ response : result})
    })
  })
}

//DELETE SEVERAL PROJECT DOCUMENTS
async function deleteMultiple(req)
{
  var filter = req.body.filter;
  return new Promise(function(resolve, reject) {

    projects.deleteMany(filter, (err, result) => { 
      if (err) {
        console.error(err)
        reject({ err: err })
      }
      resolve({ response : result})
    })
  })
}

module.exports = {getAll, getSingle, getByAsso, addSingle, updateSingle, updateMultiple, deleteSingle, deleteMultiple };