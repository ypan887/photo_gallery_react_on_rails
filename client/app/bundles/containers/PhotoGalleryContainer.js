import React from 'react'
import { } from '../actions'
import ImageFiguresContainer from './ImageFiguresContainer'

export default class PhotoGalleryContainer extends React.Component {
  render() {
    return (
      <section className="index stage">
        <ImageFiguresContainer className='img-sec' {...this.props}/>
      </section>
      );
  }
}
