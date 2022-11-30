const projectFields = ['name', 'university', 'tag'];
const mandatoryFields = ['name'];

//CHECK IF EVERY FIELDS NAME ARE VALID ONE
function isProjectFields(project) {
  for (i in project) {
    if (!projectFields.includes(i)) return [false, i];
  }
  return [true, ''];
}

//CHECK IF MADATORY FIELDS ARE PRESENT
function isThereMandatoryFields(req) {
  for (i in mandatoryFields) {
    var field = req[mandatoryFields[i]];
    if (field === null || field === undefined || field === void 0)
      return [false, mandatoryFields[i]];
  }
  return [true, ''];
}

module.exports = { isProjectFields, isThereMandatoryFields };
