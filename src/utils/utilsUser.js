const userFields = ["firstname", "lastname", "email", "password", "credential"]
const mandatoryFields = ["firstname", "lastname", "email", "password", "credential"]

//CHECK IF EVERY FIELDS NAME ARE VALID ONE
function isUserFields(user) {
  
  for (i in user) 
  {
    if (!userFields.includes(i))
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


module.exports = {isUserFields, isThereMandatoryFields}