import React from 'react';
import UploadButtonWidget from '../components/UploadButtonWidget';
import UploadFormWidget from '../components/UploadFormWidget';

export default class UploadComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      uploadStatus: false
    };
  }

  switch() {
    return () => {
      let newState = !this.state.uploadStatus;

      this.setState({
        uploadStatus: newState
      });
    }
  }

  render() {
    let uploadElement = this.state.uploadStatus ? <UploadFormWidget switch={ this.switch() } /> : <UploadButtonWidget switch={ this.switch() } />;
    return (
      <div>
        { uploadElement }
      </div>
      );
  }
}
