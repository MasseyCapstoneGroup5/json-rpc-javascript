const {sdk} = require("./sdk_data");

/**
 * Very primitive catch-all mapping prototype
 * @param params (callClass, methods...)
 * @returns {Promise<*>}
 */
module.exports = async function (params) {
    let callClass = params.callClass;
    delete params.callClass;

    const {[callClass]: cl} = require("@hashgraph/sdk");

    console.log(callClass)

    let currentObject = new cl();
    for (let [method, value] of Object.entries(params)) {
        console.log("." + method + "(" + value + ")")
        if (value === "client") {
            value = sdk.client
        }
        if (typeof currentObject[method] === 'function') {
            currentObject = await currentObject[method](value)
        }else if (typeof cl[method] === 'function'){
            currentObject = cl[method](value)
        }else{
            throw Error(callClass + "." + method + "() isn't a function")
        }

    }
    return currentObject
};
