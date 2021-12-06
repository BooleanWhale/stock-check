There is an asynchronous "stockCheck" function.
This accepts a product Id and returns whether a product is in stock or not.

This challenge is to create a function called "outOfStockChecker" that wraps this functionality with additional business logic and error handling.

This "outOfStockChecker" will accept product Id(s) and will return a promise pending the results of the stock check.


----
  
__Requirement 1__
  
"outOfStockChecker" should accept product Ids as separate arguments or in an Array:

`outOfStockChecker(id1, id2, id3...)`

OR

`outOfStockChecker([id1, id2, id3...])`

  
-----

__Requirement 2__

All Ids should match the format "XXXX-XXXX-XXXX-XXXX" where X is any integer value.
 
Please use a Regex to determine whether an id matches the format or not.

Websites such as [Regex cheat sheet](https://cheatography.com/davechild/cheat-sheets/regular-expressions/) and [Regex101](https://regex101.com) should be helpful in determining syntax and testing your solution.


 Should ANY of the Ids NOT match this format then "outOfStockChecker" should return the following error:
 
  `{
    error: { code: 'invalid-format', products: [INVALID_IDS_HERE] },
  }`

-----

__Requirement 3__

All duplicate Ids should be removed.
  
If the same Id is submitted twice in the call, it should be removed before calling "stockCheck".


-----

__Requirement 4__

Each valid Id needs to be individually passed through the asynchronous "stockCheck" function.
This may be completed in parallel.

The "stockCheck" function will resolve to the following whenever successful:

  `{ id: 'XXXX-XXXX-XXXX-XXXX', inStock: Boolean }`
  

The "stockCheck" function will reject to following on failure:

  `{ id: 'XXXX-XXXX-XXXX-XXXX', code: ERROR_CODE_FROM_API }`
  

If all requests are successful, please return ALL out of stock lines from "outOfStockChecker" in the following format:
  `{ outOfStock: ['XXXX-XXXX-XXXX-XXXX'] }`
  
  
Note: 
For testing purposes all valid product Ids that begin with: 
-  "8" will return as out of stock
-  "9" will error


-----

__Requirement 5__
  
Should any "stockCheck" fail, please reject "outOfStockChecker" in the following format:

  `{ error: { id: 'XXXX-XXXX-XXXX-XXXX', code: ERROR_CODE_FROM_API } }`

Any error not described above, should be handled with the following error
  `{ error: { code: 'internal_system_error' } }`

  -----
 
__Using the stock check__
  
Please use the stock check in the following manner. This accepts valid product Id and returns a promise (as completing the action could take time).  
  `stockCheck(productId)` 
    
  The "out of stock" products or the error message should then be returned from your function in order to verify it's is working correctly.

-----
__Testing your work__
We have included a suite of Jest tests to assist you  in verifying your work. Feel free to add to these if it adds value.

To run these tests, first install the dependencies with 

`yarn install`

Then trigger the suite with:

`yarn test`
  