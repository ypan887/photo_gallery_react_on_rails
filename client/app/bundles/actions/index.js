import * as types from '../constants/ActionTypes'

export function arrange(centerIndex, posConstant) {
  return {
    type: types.ARRANGE,
    centerIndex: centerIndex,
    posConstant: posConstant
  }
}
