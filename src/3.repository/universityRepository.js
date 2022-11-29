const mongo = require("mongodb").MongoClient;
const url = process.env.MONGO_DB_URL; //"mongodb://localhost:27017";
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
      universities = db.collection("universities")
    }
  )


//GET ALL UINVERSITIES DOCUMENT
async function getAll()
{
    return new Promise(function(resolve, reject) {
      universities.find().toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
      resolve({universities : items});
      })
    })
}

//GET AN UNIVERSITY DOCUMENT BY ID
async function getSingle(req)
{
    return new Promise(function(resolve, reject) {
    const id = req.params.id;
    universities.find({ _id: ObjectId(`${id}`) }).toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
        resolve({  university : items[0] })
      })
    })
}

//ADD AN UNIVERSITY DOCUMENT
async function addSingle(req)
{
  return new Promise(function(resolve, reject) {
    const newAssociation = req.body
    
    universities.insertOne(newAssociation, (err, result) => { 
        if (err) {
          console.error(err)
          reject({ err : err })
          }
        resolve({ response : result})
      })
    })
}


//UPDATE AN UNIVERSITY DOCUMENT
async function updateSingle(req)
{
  return new Promise(function(resolve, reject) {
    const id = req.params.id
    var newvalues = { $set: req.body };
    
    universities.updateOne({ _id: ObjectId(`${id}`)}, newvalues , (err, result) => { 
        if (err) {
          console.error(err)
          reject({ err : err })
          }
        resolve({ response : result})
      })
    })
}

//DELETE AN UNIVERSITY DOCUMENT
async function deleteSingle(req)
{
  const id = req.params.id;
  return new Promise(function(resolve, reject) {

    universities.deleteOne({ _id: ObjectId(`${id}`) }, (err, result) => { 
      if (err) {
        console.error(err)
        reject({ err: err })
      }
      resolve({ response : result})
    })
  })
}

module.exports = {getAll, getSingle, addSingle, deleteSingle, updateSingle};