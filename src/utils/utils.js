
function isJsonValid(str) {
    try {
        JSON.parse(str);
    } 
    catch (e) {
        return false;
    }
    return true;
}

function isJsonEmpty(str) {
    var i = 0;
    for (j in str) {
        i++;
    }

    return i===0
}

function sleep(seconds)
{
    var waitTill = new Date(new Date().getTime() + seconds * 1000);
    while(waitTill > new Date()){}
    return;
}

function isNotFound(response)
{
    return response.hasOwnProperty('err') && response['err'] === "Not found";
}

function isExceptionOrError(response)
{
    return (response.hasOwnProperty('err') || response.hasOwnProperty('exception'));
}

function returnStatus(response)
{
    if(isNotFound(response))
        //404 - NOT FOUND
        return 404;
    else if (isExceptionOrError(response))  
        //500 - ERR or EXCEPTION
        return 500;
    else
        //200 - OK
        return 200;
}

module.exports = { isJsonValid, isJsonEmpty, sleep, returnStatus}