import React from 'react'

export default class ImageFigureWidget extends React.Component{
  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();


  }

  render(){
    const {data,
           styleObj,
           imgFigureClassName
          } = this.props

    return(
      <figure className={ imgFigureClassName } style={ styleObj } onClick={ this.handleClick.bind(this) }>
        <img src={ data.url } alt={ data.title } />
        <figcaption>
          <h2 className="img-title">
            { data.title }
          </h2>
          <div className='img-back' onClick={ this.handleClick.bind(this) }>
            <p>
              { data.desc }
            </p>
          </div>
        </figcaption>
      </figure>)
  }
}

