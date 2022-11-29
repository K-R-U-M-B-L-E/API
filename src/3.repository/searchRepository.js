const mongo = require("mongodb").MongoClient;
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
      associations = db.collection("associations")
      projects = db.collection("projects")
    }
  )


//SEARCH ALL ASSOCIATIONS DOCUMENT
async function search(pipeline)
{
    return new Promise(function(resolve, reject) {
      associations.aggregate(pipeline).toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
      resolve({associations : items});
      })
    })
}

//GET DISTINCT VALUE FOR A FIELD
async function getFieldValue(props)
{
    return new Promise(function(resolve, reject) {
      associations.distinct(props, (err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
      resolve(items);
      })
    })
}


//SEARCH IN ALL PROJECTS DOCUMENT
async function searchProject(pipeline)
{
    return new Promise(function(resolve, reject) {
      projects.aggregate(pipeline).toArray((err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
      resolve({associations : items});
      })
    })
}

//GET DISTINCT VALUE FOR A FIELD OF PROJECT
async function getFieldValueProject(props)
{
    return new Promise(function(resolve, reject) {
      projects.distinct(props, (err, items) => {
        if (err) {
          console.error(err)
          reject({ err : err })
        }
      resolve(items);
      })
    })
}

module.exports = {search, getFieldValue, searchProject, getFieldValueProject};