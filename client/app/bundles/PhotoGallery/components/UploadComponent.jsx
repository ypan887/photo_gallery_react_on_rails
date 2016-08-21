import React from 'react';
import Modal from 'boron/DropModal'
import FontAwesome from 'react-fontawesome';
import CropComponent from '../components/CropComponent';

let modalStyle = {
  maxWidth: '80%'
};

export default class UploadComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      image: '',
      imageName: '',
      imagePreviewUrl: '',
      croppedData: '',
      progress: -1
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
    let self = this;

    formData.append('image[title]', this.state.title);
    formData.append('image[desc]', this.state.desc);
    formData.append('image[image]', this.state.image);
    formData.append('authenticity_token', this.props.csrfToken)
    if (this.state.croppedData) {
      formData.append('image[croppedData]', JSON.stringify(this.state.croppedData))
    }

    this.setState
    xhr.open('POST', '/images');
    xhr.onload = function() {
      if (xhr.status === 200) {
        self.setState({
          complete: true
        })
        console.log('upload success');
      } else {
        console.log('upload error');
      }
    };

    xhr.onloadstart = function() {
      self.setState({
        imageName: ''
      })
    }

    xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
        let progressComplete = (event.loaded / event.total * 100 | 0);
        self.setState({
          progress: progressComplete
        })
      }
    };

    xhr.send(formData);
  }

  _cropImage(croppedData) {
    this.setState({
      croppedData: croppedData
    })
  }

  render() {
    const validForm = this.state.title && this.state.desc && this.state.imageName && this.state.croppedData;

    let styleObj = {};
    if (this.state.imagePreviewUrl) {
      styleObj = {
        height: 400,
        width: '100%'
      };
    }

    let formContainerClassName = 'container';
    let completeContainerClassName = 'complete-container';
    if (this.state.progress === 100) {
      formContainerClassName += ' complete';
      completeContainerClassName += ' complete';
    }

    return (
      <div>
        <FontAwesome onClick={ this.showModal.bind(this) } name='plus-circle' size='3x' id='upload-button' />
        <Modal ref="modal" maxWidth='80%'>
          <div className={ formContainerClassName }>
            <FontAwesome onClick={ this.hideModal.bind(this) } name='times' size='2x' id='close-button' />
            <form className="col s12" method="post" acceptCharset="UTF-8" encType='multipart/form-data' data-remote="true" onSubmit={ this.handleSubmit.bind(this) }>
              <div className="row">
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
                <div className="col s6">
                  <button type='submit' className='submit btn waves-effect waves-light' name="action" title="Double click to crop image before Upload" disabled={ !validForm }>Upload</button>
                </div>
                <div className="col s6">
                  <progress id="uploadprogress" min="0" max="100" value={ this.state.progress } />
                </div>
              </div>
            </form>
            <div className='preview-img col s12'>
              <CropComponent _cropImage={ this._cropImage.bind(this) } img={ this.state.imagePreviewUrl } styleObj={ styleObj } />
            </div>
          </div>
          <a className={ completeContainerClassName } href="/">
            <FontAwesome name='check-circle-o' />
          </a>
        </Modal>
      </div>
      );
  }
}
