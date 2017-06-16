import { hasProp, isFunction, isString, isArray, type } from 'pytils'
import sha256 from './sha256'

export const _ifT = (Throw, text) => {
  if (Throw) {
    throw text
  }
}

export const isEssential = (Service, contextId, context) => {
  _ifT(
    !isFunction(Service),
    'dejavu-call: Service is a essential! and need to be a function')

  _ifT(
    !isString(contextId),
    'dejavu-call: contextId is a essential! and need to be a string')

  _ifT(
    !isArray(context),
    'dejavu-call: context is a essential! and need to be a array')
}

export const stringify = context => sha256(JSON
  .stringify(context
    .map(param =>
      type(param) === 'function'
        ? param.toString()
        : param)))

const createKeeper = () => ({
  first: 0,
  last: -1,
  count: -1,
  ref: {},
  memo: {}
})

const forget = keeper => {
  const { first } = keeper
  const ref = keeper.ref[first]
  delete keeper.memo[ref]
  delete keeper.ref[first]
  keeper.count -= 1
  keeper.first += 1
}

export const memorize = (contextId, contextString, result) => {
  const keeper = inMind[contextId]
    ? inMind[contextId]
    : inMind[contextId] = createKeeper()

  const last = keeper.last += 1
  keeper.ref[last] = contextString
  keeper.memo[contextString] = result

  keeper.count += 1
  if (keeper.count > limit) {
    forget(keeper)
  }
}
