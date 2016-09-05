import { combineReducers } from 'redux'
import imagesPosition from './imagesPosition'
import uploadImage from './uploadImage'

const PhotoGalleryApp = combineReducers({
  imagesPosition,
  uploadImage
})

export default PhotoGalleryApp
