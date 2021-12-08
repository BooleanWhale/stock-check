/**
* DO NOT MODIFY, I REPEAT, DO NOT MODIFY
**/

/**
* Determines whether a single product is in stock
* @param {string} product id 
* @returns {Promise} promise that resolves or rejects depending on whether request succeeds
*
*/
function stockCheck(id) {
  const firstCharacter = id.charAt(0)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (firstCharacter === '9') {
        reject({ id, code: 'internal-server-error' })
      } else {
        resolve({ id, outOfStock: firstCharacter === '8' })
      }
    }, 200)
  })
}
/** 
 * END DO NOT MODIFY 
 **/

/**
* Identifies out of stock items
* @param {String|String<>} product ids - a list of product Ids to verify whether they are in stock
* @returns {Promise} resolve/reject to out of stock products or error code
**/

function outOfStockChecker() {
  // converts product IDs into array (works for single and multiple arguments)
  const idArray = [...new Set( arguments.length > 1 
    ? Array.from(arguments) 
    : Array.from(arguments[0])
  )]
  
  // checks for invalid IDs and creates a list
  const invalidIds = idArray.filter(productId => {
    return /^\d{4}-\d{4}-\d{4}-\d{4}$/.test(productId) === false;
  });
  
  // returns error code if any IDs are invalid
  if (invalidIds.length > 0) {
    return { "error": { "code": "invalid-format", "products": invalidIds } }
  }

  // Checks stock with stockCheck
  const stockCheckFilter = () => {
    return Promise.all(idArray.map( (productId) => {
      return stockCheck(productId) 
    }))
    .then(products => { // filters out-of-stock products and maps their IDs in an array
      const outOfStock = products
        .filter(product => product["outOfStock"])
        .map(product => product["id"])
      return {"outOfStock": outOfStock}
    })
    .catch(error => { // throws error code with fallback
      const errorCode = { "error": error.code
        ? {"code": error.code,"id": error.id}
        : {"code": "internal_system_error"}
      }
      throw errorCode
    })
  }

  return stockCheckFilter()
}

module.exports = outOfStockChecker