const associationFields = ["name", "university", "visible","tag","city"]
const mandatoryFields = ["name", "university", "visible"]


function getAssociationFields()
{
    return associationFields;
}

function setAssociationFields(field)
{
    if(!associationFields.includes(field))
      associationFields.push(field)
}

function isThisAssociationField(field)
{
    return associationFields.includes(field)
}


//CHECK IF EVERY FIELDS NAME ARE VALID ONE
function isAssociationField(association) {
  
  for (i in association) 
  {
    if (!isThisAssociationField(i))
      return [false, i];
  }
  return [true, ""];
}

//CHECK IF MADATORY FIELDS ARE PRESENT
function isThereMandatoryFields(req)
{
  for (i in mandatoryFields)
  {
    var field = req[mandatoryFields[i]]
    if (field === null || field === undefined || field === void 0)
      return [false, mandatoryFields[i]];
  }
  return [true, ""];
}


//CHECK IF TWO ASSOCIATION ARE THE SAME
function compareAssociations(associationA, associationB)
{
    console.log("asso A", associationA, "asso B", associationB)
    return associationA["name"].toLowerCase() === associationB["name"].toLowerCase() 
    && associationA["university"].toLowerCase() === associationB["university"].toLowerCase()
}



module.exports = {isAssociationField, isThereMandatoryFields, compareAssociations, isThisAssociationField, getAssociationFields}