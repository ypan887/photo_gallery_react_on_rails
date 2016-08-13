import React from 'react';

export default class ImgFigure extends React.Component {
  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    let styleObj = {};
    let imgFigureClassName = 'img-figure';

    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    if (this.props.arrange.rotate) {
      (['Moz', 'ms', 'Webkit', '']).forEach((value) => {
        styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      });
    }

    if (this.props.arrange.isInverse) {
      imgFigureClassName += ' is-inverse';
    }

    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    return (
      <figure className={ imgFigureClassName } style={ styleObj } onClick={ this.handleClick.bind(this) }>
        <img src={ this.props.data.url } alt={ this.props.data.title } />
        <figcaption>
          <h2 className="img-title">{ this.props.data.title }</h2>
          <div className='img-back' onClick={ this.handleClick.bind(this) }>
            <p>
              { this.props.data.desc }
            </p>
          </div>
        </figcaption>
      </figure>
      );
  }
}
