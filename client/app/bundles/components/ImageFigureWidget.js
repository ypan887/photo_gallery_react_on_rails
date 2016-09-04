import React from 'react'

export default class ImageFigureWidget extends React.Component{
  render(){
    const {imgsArrangeArr,
           data,
           styleObj,
           imgFigureClassName
          } = this.props
    return(
      <figure className={ imgFigureClassName } style={ styleObj }>
        <img src={ data.url } alt={ data.title } />
        <figcaption>
          <h2 className="img-title">
            { data.title }
          </h2>
          <div className='img-back'>
            <p>
              { data.desc }
            </p>
          </div>
        </figcaption>
      </figure>)
  }
}

