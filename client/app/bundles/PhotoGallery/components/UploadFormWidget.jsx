import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class UploadForm extends React.Component {

  handleUpload(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.switch();
  }

  render() {
    return (
      <form className='form-inline'>
        <div className='form-group'>
          <label for="file-upload" class="custom-file-upload">
            <i class="fa fa-cloud-upload"></i>Custom Upload
          </label>
          <input className='form-control' id="file-upload" type="file"></input>
        </div>
        <button type='submit'>Upload</button>
        <div>
          <FontAwesome className='button-cancel' name='undo' size='2x' onClick={ this.handleToggle.bind(this) } />
        </div>
      </form>
      );
  }
}
