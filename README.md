# DEJAVU CALL
Intercepts a function call and stores the result with the given context.
In calls that have the same parameters, it will return the stored result.
The proposal is to reduce the response time for processing heavy functions, but it always has the same result. Doing this in a simple and transparent way, taking away the need for developer memory management.

[![NPM](https://nodei.co/npm/dejavu-call.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/dejavu-call/)
[![NPM](https://nodei.co/npm-dl/dejavu-call.png?height=3&months=2)](https://nodei.co/npm-dl/dejavu-call/)

## I will help if you have any difficulty =)
Contact me by [github:heyderpd](https://github.com/heyderpd). I'll be glad to help you.

## Thanks for [npm~lucasmreis](https://www.npmjs.com/~lucasmreis)

## To create a new file from another, using call's found in a directory and whitelist
If is whitelist program will use list (of anymatch)  to select id's. And will search call's in directories, using the rest of id's found in svg. Finally create a big whitelist to extract!
Else is a blacklist will use list (of anymatch) to remove id's. And will search id's is not called in directories, using the of rest id's found in svg. Finally create a big blacklist to extract!
You don't need pass a list if pass a directory.
The var list accept any values of [anymath](https://www.npmjs.com/package/anymatch) module

## IMPORTANT!!!
In 'recall' your function (named as Service) will receive yours parameters (named as context) using the spread operator
```javascript
export const recall = (contextId, Service, context, Throw = false) => {
  /*  *** */
  return Service(...context)
}
```

## To intercept and return result from memorizer or run your function, depending on being memorized earlier
Example:
```javascript
const { recall, getHash } = require('dejavu-call')
/* IMPORTANT!!! in 'recall' your function (named as Service) will receive yours parameters (named as context) using the spread operator */
   export const recall = (contextId, Service, context, Throw = false) => {
    ***
    return Service(...context)
  }
/* */

const heavyFunctions = (a, b, c) => a +b +c
const functionId = getHash('heavyFunctions') || getHash(functionId.toString())
const heavyFunctionsMemorized = context => recall(functionId, heavyFunctions, context)

const context = [a, b, c]
const result = heavyFunctionsMemorized(context)
```
## OR
Example:
```javascript
const { recall, getHash } = require('dejavu-call')

const heavyFunctions = (a, b, c) => a +b +c
const functionId = getHash('heavyFunctions') || getHash(functionId.toString())

const context = [a, b, c]
const result = recall(functionId, heavyFunctions, context)
```

## If you do not want to use memorizer as an interceptor, you can use this way
Example:
```javascript
const { getHash, remember } = require('dejavu-call')

const heavyFunctions = (a, b, c) => a +b +c
const functionId = getHash('heavyFunctions') || getHash(functionId.toString())

const context = [a, b, c]
let result
try {
  result = remember(functionId, context)
} catch (err) {
  /* err = dejavu-call: no memory found || dejavu-call: no keeper found */
  result = functionId(...context)
}
```
