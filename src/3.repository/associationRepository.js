const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
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
      associations = db.collection("associations")
    }
  )


//GET ALL ASSOCIATIONS DOCUMENT
async function getAll()
{
    return new Promise(function(resolve, reject) {
      associations.find().toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
      resolve({associations : items});
      })
    })
}

//GET ALL VISIBLE ASSOCIATIONS DOCUMENT
async function getVisible()
{
    return new Promise(function(resolve, reject) {
      associations.find( {visible: true }).toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
      resolve({associations : items});
      })
    })
}

//GET ALL INVISIBLE ASSOCIATIONS DOCUMENT
async function getInvisible()
{
    return new Promise(function(resolve, reject) {
      associations.find( {visible: false }).toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
      resolve({associations : items});
      })
    })
}

//GET AN ASSOCIATION DOCUMENT BY ID
async function getSingle(req)
{
    return new Promise(function(resolve, reject) {
    const id = req.params.id;
    associations.find({ _id: ObjectId(`${id}`) }).toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
        resolve({  association : items[0] })
      })
    })
}

//GET AN ASSOCIATION DOCUMENT BY NAME
async function getByName(req)
{
    return new Promise(function(resolve, reject) {
    const name = req.params.name;
    associations.find({ name: `${name}` }).toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
        resolve({  association : items[0] })
      })
    })
}

//ADD AN ASSOCIATION DOCUMENT
async function addSingle(req)
{
  return new Promise(function(resolve, reject) {
    const newAssociation = req.body
    
    associations.insertOne(newAssociation, (err, result) => { 
        if (err) {
          console.error(err)
          reject({ err : err })
          }
        resolve({ response : result})
      })
    })
}


//UPDATE AN ASSOCIATION DOCUMENT
async function updateSingle(req)
{
  return new Promise(function(resolve, reject) {
    const id = req.params.id
    var newvalues = { $set: req.body };
    
    associations.updateOne({ _id: ObjectId(`${id}`)}, newvalues , (err, result) => { 
        if (err) {
          console.error(err)
          reject({ err : err })
          }
        resolve({ response : result})
      })
    })
}

//DELETE AN ASSOCIATION DOCUMENT
async function deleteSingle(req)
{
  const id = req.params.id;
  return new Promise(function(resolve, reject) {

    associations.deleteOne({ _id: ObjectId(`${id}`) }, (err, result) => { 
      if (err) {
        console.error(err)
        reject({ err: err })
      }
      resolve({ response : result})
    })
  })
}

module.exports = {getAll, getVisible, getInvisible, getSingle, getByName, addSingle, deleteSingle, updateSingle};