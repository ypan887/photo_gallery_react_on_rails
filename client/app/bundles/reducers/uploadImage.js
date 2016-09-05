import { combineReducers } from 'redux'
import { GETINPUT, GETIMAGE, CROPIMAGE} from '../constants/ActionTypes'

const initialInput = {
      title: '',
      desc: ''
    }
const initialImage = {
  image: '',
  imageName: '',
  imagePreviewUrl: ''
}
const initialCrop = { croppedData: '' }
const initialUpload = {
  complete: '',
  progress: -1
}

function input(state = initialInput, action) {
  switch (action.type) {
    case GETINPUT:
      return Object.assign({}, state, action.input)
    default:
      return state
  }
}

function image(state = initialImage, action) {
  switch (action.type) {
    case GETIMAGE:
      return Object.assign({}, state, action.image)
    default:
      return state
  }
}

function crop(state = initialCrop, action) {
  switch (action.type) {
    case CROPIMAGE:
      return Object.assign({}, state, action.croppedData)
    default:
      return state
  }
}

export default combineReducers({
  input,
  image,
  crop
})
