const universityFields = ['name', 'type', 'cities'];
const mandatoryFields = ['name', 'type'];

//CHECK IF EVERY FIELDS NAME ARE VALID ONE
function isUniversityField(universities) {
  for (i in universities) {
    if (!universityFields.includes(i)) return [false, i];
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

module.exports = { isUniversityField, isThereMandatoryFields };
