import React from 'react';
import Modal from 'boron/DropModal'
import FontAwesome from 'react-fontawesome';

export default class UploadComponent extends React.Component {
  constructor() {
    super();
  }

  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
  }

  callback(event) {
    console.log(event);
  }

  render() {
    return (
      <div>
        <FontAwesome onClick={ this.showModal.bind(this) } name='plus-circle' size='3x' id='upload-button' />
        <Modal ref="modal" keyboard={ this.callback }>
          <FontAwesome onClick={ this.hideModal.bind(this) } name='times' size='2x' id='close-button' />
          <div className="container">
            <form action="/images" className="col s12" method="post" acceptCharset="UTF-8" encType='multipart/form-data'>
              <div className="row">
                <input type='hidden' name='authenticity_token' value={ this.props.csrfToken } />
                <div className="input-field col s12">
                  <input placeholder="Title" name="image[title]" type="text" className="validate" />
                  <label htmlFor="first_name">Title</label>
                </div>
                <div className="input-field col s12">
                  <input name="image[desc]" type="text" className="validate" />
                  <label htmlFor="desc">Description</label>
                </div>
                <div className="file-field input-field col s12">
                  <div className="btn">
                    <span>Choose a image</span>
                    <input type="file" name="image[image]" accept="image/*" />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
                <div className="col s12">
                  <button type='submit' className='submit btn waves-effect waves-light' name="action">Upload</button>
                </div>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      );
  }
}
