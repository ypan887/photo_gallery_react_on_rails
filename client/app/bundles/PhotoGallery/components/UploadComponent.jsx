import React from 'react';
import Modal from 'boron/DropModal'
import FontAwesome from 'react-fontawesome';

export default class UploadComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      imageName: '',
      image: '',
      imagePreviewUrl: ''
    }
  }

  handleChange(e) {
    name = e.target.name.match(/\[(.*?)\]/)[1];
    this.setState({
      [name]: e.target.value
    });
  }

  handleImgChange(e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        image: file,
        imageName: file.name,
        imagePreviewUrl: reader.result
      });
    }

    reader.onerror = (event) => {
      console.error("File could not be read! Code " + event.target.error.code);
    }

    reader.readAsDataURL(file)
  }

  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    let formData = new FormData();
    let xhr = new XMLHttpRequest();

    formData.append('image[title]', this.state.title);
    formData.append('image[desc]', this.state.desc);
    formData.append('image[image]', this.state.image);
    formData.append('authenticity_token', this.props.csrfToken)
    xhr.open('POST', '/images');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log('上传成功');
      } else {
        console.log('出错了');
      }
    };
    xhr.send(formData);
  }

  callback(event) {
    console.log(event);
  }

  render() {
    const validForm = this.state.title && this.state.desc && this.state.imageName;
    let imagePreviewUrl = this.state.imagePreviewUrl;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (<img src={ imagePreviewUrl } alt={ this.state.title } />);
    }

    return (
      <div>
        <FontAwesome onClick={ this.showModal.bind(this) } name='plus-circle' size='3x' id='upload-button' />
        <Modal ref="modal" keyboard={ this.callback }>
          <FontAwesome onClick={ this.hideModal.bind(this) } name='times' size='2x' id='close-button' />
          <div className="container">
            <form className="col s12" method="post" acceptCharset="UTF-8" encType='multipart/form-data' data-remote="true" onSubmit={ this.handleSubmit.bind(this) }>
              <div className="row">
                <input type='hidden' name='authenticity_token' value={ this.props.csrfToken } />
                <div className="input-field col s12">
                  <input placeholder="Title" name="image[title]" type="text" className="validate" value={ this.state.title } onChange={ this.handleChange.bind(this) } />
                  <label htmlFor="first_name">Title</label>
                </div>
                <div className="input-field col s12">
                  <input name="image[desc]" type="text" className="validate" value={ this.state.desc } onChange={ this.handleChange.bind(this) } />
                  <label htmlFor="desc">Description</label>
                </div>
                <div className="file-field input-field col s12">
                  <div className="btn">
                    <span>Choose a image</span>
                    <input id="file" type="file" name="image[image]" accept="image/*" onChange={ this.handleImgChange.bind(this) } />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                  </div>
                </div>
                <div className="col s12">
                  <button type='submit' className='submit btn waves-effect waves-light' name="action" disabled={ !validForm }>Upload</button>
                </div>
              </div>
            </form>
            <div className='preview-img col s12'>
              { imagePreview }
            </div>
          </div>
        </Modal>
      </div>
      );
  }
}
