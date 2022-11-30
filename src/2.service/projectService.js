const repository = require("../3.repository/projectRepository");
const associationService = require("./associationservice");
const { isThereMandatoryFields, isProjectFields } = require("../utils/utilsProject");
const { isJsonValid, isJsonEmpty } = require("../utils/utils");
const { json } = require("express");
var ObjectId = require('mongodb').ObjectId; 



//GET ALL THE PROJECTS
async function getAll()
{
    var response = await repository.getAll();
    return response
}



//GET A SINGLE PROJECT BY ID
//Check: - if id is valid => return err
//       - if body is empty => return not found
async function getSingle(req)
{
    if (!ObjectId.isValid(req.params.id)) { return ({ err: "ObjectId invalid"}) }
    
    var response = await repository.getSingle(req);
    if (response.project === undefined || response === null) { return { err: "Not found"}}
    else return response
}

//GET PROJECTS OF AN ASSOCIATION
//Check: - if id is invalid => return err
async function getByAsso(req)
{
    var associationResponse = associationService.getSingle(req);
    if (associationResponse.hasOwnProperty('err')) { return associationResponse}

    var response = await repository.getByAsso(req);
    return response
}



//ADD A SINGLE PROJECT
//Check : - if mandatory fields are presents => return exception
//        - if every fields presents is an acceptable fields => return exception
async function addSingle(req)
{
    var [mandatoryFields, absentField] = isThereMandatoryFields(req.body)
    if (!mandatoryFields) { return { exception : `Mandatory field ${absentField} is missing`}}

    var [fieldsLegitimate, incorrectField] = isProjectFields(req.body)
    if (!fieldsLegitimate) { return { exception : `Wrong field name ${incorrectField}` }}
        
    try {
        var response = await repository.addSingle(req) 
        return response
    }
    catch(err) {

        console.error(err)
        return err;
    }
    
}




//UPDATE A SINGLE PROJECT
//Check : - if id is valid  => return err 
//        - if id exists => return not found
//        - if Json is empty => return without err
//        - if every fields presents is an acceptable fields => return exception
//        - if modification had been done => return without err
async function updateSingle(req)
{
    if (!ObjectId.isValid(req.params.id)) { return ({ err: "ObjectId invalid"}) }
    if (getSingle(req) === { err: "Not found"} ) { return ({ err: "Not Found"})}
    if (isJsonEmpty(req.body) ) { return { status : "Nothing to update"}}

    var [fieldsLegitimate, incorrectField] = isProjectFields(req.body)
    if (!fieldsLegitimate) { return { exception : `Wrong field name ${incorrectField}` }}
    
    try {
        var response = await repository.updateSingle(req)
        if (response.response.modifiedCount === 0 ) { return { status : "Nothing to update"}}
        return response
    }
    catch(err)
    {
        console.errorr(err);
        return err;
    }
    
}




//DELETE A SINGLE PROJECT
//Check: - if id is invalid => return err
//       - if something had been deleted => return not found
async function deleteSingle(req)
{
    if (!ObjectId.isValid(req.params.id)) { return ({ err: "ObjectId invalid"}) }

    var response = await repository.deleteSingle(req);
    if (response.response.deletedCount === 0) {return ({ err : "Not found"})}
    return response
}



module.exports = {getAll, getSingle, getByAsso, addSingle, deleteSingle, updateSingle};