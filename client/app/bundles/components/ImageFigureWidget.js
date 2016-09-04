import React from 'react'

export default class ImageFigureWidget extends React.Component{
  render(){
    const { data, styleObj, imgFigureClassName, handleClick } = this.props

    return(
      <figure className={ imgFigureClassName }
              style={ styleObj }
              onClick={ handleClick }
      >
        <img src={ data.url } alt={ data.title } />
        <figcaption>
          <h2 className="img-title">
            { data.title }
          </h2>
          <div className='img-back' onClick={ handleClick }>
            <p>
              { data.desc }
            </p>
          </div>
        </figcaption>
      </figure>)
  }
}

