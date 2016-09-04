import * as types from '../constants/ActionTypes'

export function arrange(centerIndex, posConstant) {
  return {
    type: types.ARRANGE,
    centerIndex: centerIndex,
    posConstant: posConstant
  }
}

export function inverse(index) {
  return {
    type: types.INVERSE,
    index: index
  }
}
