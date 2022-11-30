let ObjectId = require('mongodb').ObjectId;
const {MongoClient} = require('mongodb');

const DATABASE_NAME = "krumble-catalogue";
const ASSOCIATION_COLLECTION_NAME = "associations";
const PROJECT_COLLECTION_NAME = "projects";
const USER_COLLECTION_NAME = "users";
const UNIVERSITY_COLLECTION_NAME = "universities";

const url =  process.env.MONGO_DB_URL || "mongodb://localhost:27017";
const client = new MongoClient(url);




async function connectMongoDatabase(databaseName, collectionName) {
    try {
        await client.connect();
        let db = client.db(databaseName);
        let collection = db.collection(collectionName);
        return collection;
    } catch (e) {
        console.error("[DATABASE][database.js] Error while connecting to mongo database: ", e);
        console.error("[DATABASE][database.js] Arguments: databaseName: ${databaseName} | collectionName: ${collectionName} ", e.stack);
    }
}

// design pattern singleton to avoid multiple connection to the database
let ASSOCIATIONS_COLLECTION = {
    connection : null,
    getCollection : async function() {
        if (this.connection == null) {
            if (process.env.TEST) {
                console.log("[TEST][database.js]: ASSOCIATIONS_COLLECTION.getCollection()");
                console.log("trying to connect to mongo database...");
                console.log("________________________________________________________");
            }
            this.connection = await connectMongoDatabase(DATABASE_NAME, ASSOCIATION_COLLECTION_NAME);
        }
        return this.connection;
    }
}

let PROJECTS_COLLECTION = {
    connection : null,
    getCollection : async function() {
        if (this.connection == null) {
            if (process.env.TEST) {
                console.log("[TEST][database.js]: PROJECTS_COLLECTION.getCollection()");
                console.log("trying to connect to mongo database...");
                console.log("________________________________________________________");
            }
            this.connection = await connectMongoDatabase(DATABASE_NAME, PROJECT_COLLECTION_NAME);
        }
        return this.connection;
    }
}
let USERS_COLLECTION = {
    connection : null,
    getCollection : async function() {
        if (this.connection == null) {
            if (process.env.TEST) {
                console.log("[TEST][database.js]: USERS_COLLECTION.getCollection()");
                console.log("trying to connect to mongo database...");
                console.log("________________________________________________________");
            }
            this.connection = await connectMongoDatabase(DATABASE_NAME, USER_COLLECTION_NAME);
        }
        return this.connection;
    }
}
let UNIVERSITIES_COLLECTION  = {
    connection : null,
    getCollection : async function() {
        if (this.connection == null) {
            if (process.env.TEST) {
                console.log("[TEST][database.js]: UNIVERSITES_COLLECTION.getCollection()");
                console.log("trying to connect to mongo database...");
                console.log("________________________________________________________");
            }
            this.connection = await connectMongoDatabase(DATABASE_NAME, UNIVERSITY_COLLECTION_NAME);
        }
        return this.connection;
    }
}


module.exports = { ASSOCIATIONS_COLLECTION, USERS_COLLECTION, PROJECTS_COLLECTION, UNIVERSITIES_COLLECTION };


