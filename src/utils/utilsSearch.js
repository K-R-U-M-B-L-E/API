const { isJsonValid, isJsonEmpty } = require('./utils');
const { isThisAssociationField } = require('./utilsAssociation');

function pipelineBuilder(body) {
  pipeline = [];
  for (operator in body) {
    var value = body[operator];
    if (value != null || value !== []) {
      const operatorPipelineBuild = buildOperator(operator, value);
      for (i in operatorPipelineBuild) {
        var request = operatorPipelineBuild[i];
        if (request.hasOwnProperty('err')) {
          return request;
        }
        pipeline.push(request);
      }
    }
  }
  console.log('pipeline', pipeline);
  return pipeline;
}

function buildOperator(field, value) {
  switch (field) {
    case 'match':
      return [operatorMatch(value)];
    case 'sort':
      return [operatorSort(value)];
    case 'research':
      return OperatorText(value);
    default:
      return [{ err: `Wrong operator name ${field}` }];
  }
}

function isEmptyValue(value) {
  return value.length === 0;
}

function operatorMatch(toMatch) {
  fieldsList = {};
  for (filter in toMatch) {
    if (!isThisAssociationField(filter))
      return { err: `Wrong field name ${filter} in match operator` };

    var value = toMatch[`${filter}`];
    if (isEmptyValue(value)) {
      continue;
    }

    logicOperator = {};
    logicOperator['$in'] = value;

    fieldsList[filter] = logicOperator;
  }

  operator = {};
  operator['$match'] = fieldsList;

  return operator;
}

function operatorSort(toSort) {
  fieldsList = {};
  for (field in toSort) {
    var value = toSort[field][0];
    var order = toSort[field][1];
    if (!isThisAssociationField(value))
      return { err: `Wrong field name ${value} in sort operator` };

    fieldsList[value] = order;
  }

  if (isJsonEmpty(fieldsList)) return null;

  operator = {};
  operator['$sort'] = fieldsList;

  return operator;
}

function OperatorText(researchValue) {
  return [
    { $match: { $text: { $search: researchValue } } },
    { $sort: { score: { $meta: 'textScore' } } },
  ];
}

module.exports = { pipelineBuilder, OperatorText };
