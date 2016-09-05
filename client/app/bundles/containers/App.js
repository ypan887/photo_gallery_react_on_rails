import React from 'react'
import PhotoGalleryContainer from './PhotoGalleryContainer'
import UploadContainer from './UploadContainer'

const App = (props) => (
  <div>
    <PhotoGalleryContainer {...props}/>
    <UploadContainer/>
  </div>
)

export default App
