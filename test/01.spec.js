const assert = require('assert')

const { getHash, recall, remember } = require('../src/main')

const tooSlow = () => {
  const r = Math.random()
  const x = Math.sqrt(r)
  Math.pow(x, x)
}

const tooHeavyFunction = x => {
  let r = 1000000
  while (r-- > 0) {
    tooSlow()
  }
  return x +x
}

const functionId = getHash('tooHeavyFunction')
const functionToString = getHash(tooHeavyFunction.toString())

const crono = function(){
  this.start = +new Date()

  this.reStart = function(){
    this.start = +new Date()
  }

  this.end = function(){
    return (+new Date() -this.start) /1000
  }

  this.log = function(){
    console.log(`elapsed time: ${this.end()}`)
  }
}

describe('src', function() {
  it('crono', function() {
    const c = new crono()
    let result
    let r = 10
    while (r-- > 0) {
      result = tooHeavyFunction(3)
    }
    c.log()
    assert.equal(result, 6)
  })

  it('recall with functionId', function() {
    const context = [4]
    const heavyFunctionsMemorized = context => recall(functionId, tooHeavyFunction, context)
    const c = new crono()
    let result
    let r = 10
    while (r-- > 0) {
      result = heavyFunctionsMemorized(context)
    }
    c.log()
    assert.equal(result, 8)
  })

  it('recall with functionToString and multiple calls', function() {
    const contextA = [1, 2, 3]
    const contextB = [4, 5, 6]
    const contextC = [7, 8, 9]
    const heavyFunctionsMemorized = context => recall(functionToString, tooHeavyFunction, context)
    const c = new crono()
    let result
    let r = 10
    while (r-- > 0) {
      result = heavyFunctionsMemorized(contextA)
      result = heavyFunctionsMemorized(contextB)
      result = heavyFunctionsMemorized(contextC)
    }
    c.log()
    assert.equal(result, 14)
  })

  it('recall with two diff functions', function() {
    const contextA = [6, 8]
    const contextB = [5, 9]
    const heavyFunctionsMemorizedA = context => recall(functionId, tooHeavyFunction, context)
    const heavyFunctionsMemorizedB = context => recall(functionToString, tooHeavyFunction, context)
    const c = new crono()
    let resultA, resultB
    let r = 10
    while (r-- > 0) {
      resultA = heavyFunctionsMemorizedA(contextA)
      resultB = heavyFunctionsMemorizedB(contextB)
    }
    c.log()
    assert.equal(resultA, 12)
    assert.equal(resultB, 10)
  })
})
