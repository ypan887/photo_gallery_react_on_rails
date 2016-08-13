import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class UploadButton extends React.Component {
  handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.switch();
  }

  render() {
    return (
      <FontAwesome className='button-icon' name='plus-circle' size='2x' onClick={ this.handleToggle.bind(this) } />
      );
  }
}
