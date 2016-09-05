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

export function getInput(input) {
  return {
    type: types.GETINPUT,
    input: input
  }
}

export function getImage(image) {
  return {
    type: types.GETIMAGE,
    image: image
  }
}

export function cropImage(croppedData) {
  return {
    type: types.CROPIMAGE,
    croppedData: croppedData
  }
}
