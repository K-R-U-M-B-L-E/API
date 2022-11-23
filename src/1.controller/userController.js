const { response } = require("express");
const utils = require("../utils/utilsUser");
const service = require("../2.service/userService");
const { returnStatus } = require("../utils/utils");

let options = {
    maxAge: 1000 * 60 * 300, // would expire after 15 minutes
    httpOnly: false, // The cookie only accessible by the web server
    signed: false // Indicates if the cookie should be signed
}


//GET ALL USERS
//Check : - if an error occured => return 500

async function getAll(req, res) 
{
    var response = await service.getAll();
    var statusCode = returnStatus(response)
    res.status(statusCode).json(response)
}


//GET AN USER BY ID
//Check : - - if the id does not exist => return 404
//          - if an error occured => return 500

async function getSingle(req, res) 
{
    var response = await service.getSingle(req);
    var statusCode = returnStatus(response)
    res.status(statusCode).json(response)
}


//GET AN USER BY EMAIL
//Check :   - if the email does not exist => return 404
//          - if an error occured => return 500

async function getByEmail(req, res) 
{
    var response = await service.getByEmail(req);
    var statusCode = returnStatus(response)
    res.status(statusCode).json(response)
}



//ADD AN USER
//Check : - if an error occured => return 500
//        - if an exception on fields occured => return 500

async function addSingle(req, res) 
{
    var response = await service.addSingle(req);
    var statusCode = returnStatus(response)
    res.status(statusCode).json(response)
}



//UPDATE AN USER BY ID
//Check : - if the id does not exist => return 404  
//        - if an error occured => return 500 
//        - if an exception on fields occured => return 500  
//        - if nothing had to be update => return 200
 
async function updateSingle(req, res) 
{
    var response = await service.updateSingle(req);
    var statusCode = returnStatus(response)
    res.status(statusCode).json(response)
}



//DELETE AN USER
//Check : - if the id does not exist => return 404
//        - if an error occured => return 500   

async function deleteSingle(req, res) 
{
    var response = await service.deleteSingle(req);
    var statusCode = returnStatus(response)
    res.status(statusCode).json(response)
}

async function login(req, res)
{
    var response = await service.login(req);
    var statusCode = returnStatus(response);
    if (statusCode === 200)
        res.cookie('token',response.token, options)
    res.status(statusCode).json(response.response)
    
}

async function loginWithToken(req, res)
{
    var response = await service.loginWithToken(req);
    var statusCode = returnStatus(response)
    res.status(statusCode).json(response)    
}

module.exports = { getAll, getSingle, getByEmail, addSingle, deleteSingle, updateSingle, login, loginWithToken };