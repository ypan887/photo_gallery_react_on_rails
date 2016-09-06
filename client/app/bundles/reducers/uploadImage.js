import { combineReducers } from 'redux'
import {
  GETINPUT,
  GETIMAGE,
  CROPIMAGE,
  INITIALPROGRESSBAR,
  COMPLETEPROGRESSBAR,
  ERRORPROGRESSBAR,
  SETPROGRESS,
  EMPTYINPUT
} from '../constants/ActionTypes'

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

function input(state = initialInput, action) {
  switch (action.type) {
    case GETINPUT:
      return Object.assign({}, state, action.input)
    case EMPTYINPUT:
      return initialInput
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

function complete(state = '', action) {
  switch(action.type) {
    case INITIALPROGRESSBAR:
      return 'start'
    case COMPLETEPROGRESSBAR:
      return 'success'
    case ERRORPROGRESSBAR:
      return 'error'
    default:
      return state
  }
}

function progress(state = -1, action) {
  switch(action.type) {
    case SETPROGRESS:
      return action.progressComplete
    default:
      return state
  }
}

export default combineReducers({
  input,
  image,
  crop,
  complete,
  progress
})
