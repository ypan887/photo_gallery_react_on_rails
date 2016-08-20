import React from 'react';
import Cropper from 'react-cropper';

export default class CropComponent extends React.Component {
  handleDoubleClick() {
    let croppedData = {};
    croppedData = this.refs.cropper.getData();
    this.props._cropImage(croppedData);
  }

  render() {
    return (
      <Cropper ref='cropper' src={ this.props.img } style={ this.props.styleObj } aspectRatio={ 1 / 1 } guides={ false } crop={ this._crop }
        responsive={ true } checkOrientation={ true } center={ true } rotatable={ false } onDoubleClick={ this.handleDoubleClick.bind(this) }
      />
      );
  }
}
