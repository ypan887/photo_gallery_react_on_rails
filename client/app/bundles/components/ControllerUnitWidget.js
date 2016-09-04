import React from 'react';

export default class ControllerUnit extends React.Component {
  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    e.preventDefault;
    e.stopPropagation;
  }

  render() {
    const { controllerUnitClassName } = this.props

    return (
      <span className={ controllerUnitClassName } onClick={ this.handleClick.bind(this) }></span>
      );
  }
}
