import React from 'react';
import PhotoGallery from '../containers/PhotoGallery';

export default (props) => (
  <PhotoGallery data={ props.images } csrfToken={ props.form_token } />
);
