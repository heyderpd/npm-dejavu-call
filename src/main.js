import { hasProp } from 'pytils'
import { stringify, memorize, isEssential, _ifT } from './utils'
import sha256 from './sha256'

const limit = 20
const inMind = {}

const _remember = (contextId, context, Throw) => {
  const contextString = stringify(context)
  if (hasProp(inMind, contextId)) {
    const keeper = inMind[contextId]
    if (hasProp(keeper.memo, contextString)) {
      return { memo: inMind[contextString] }
    }
    _ifT(Throw, 'dejavu-call: no memory found')
  }
  _ifT(Throw, 'dejavu-call: no keeper found')
  return {}
}

export const getHash = sha256

export const remember = (contextId, context, Throw = true) => {
  isEssential(Service, contextId, context)
  return _remember(contextId, context, Throw)
}

export const recall = (contextId, Service, context, Throw = false) => {
  isEssential(Service, contextId, context)
  const maybe = _remember(contextId, context, Throw)
  if (hasProp(maybe, 'memo')) {
    return maybe.memo

  } else {
    const result = Service(...context)
    memorize(contextId, contextString, result)
    return result
  }
}
