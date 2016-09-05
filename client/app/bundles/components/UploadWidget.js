import React from 'react';
import FontAwesome from 'react-fontawesome';

export default class UploadWidget extends React.Component {

  handleChange(e) {
    name = e.target.name.match(/\[(.*?)\]/)[1];
    this.props.getInput({
      [name]: e.target.value
    });
  }

  handleImgChange(e) {
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      this.props.getImage({
        image: file,
        imageName: file.name,
        imagePreviewUrl: reader.result
      });
    }

    reader.onerror = (event) => {
      console.error('File could not be read! Code ' + event.target.error.code);
    }

    reader.readAsDataURL(file)
  }

  handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

  //   let formData = new FormData();
  //   let xhr = new XMLHttpRequest();
  //   let self = this;

  //   formData.append('image[title]', this.props.title);
  //   formData.append('image[desc]', this.props.desc);
  //   formData.append('image[image]', this.props.image);
  //   formData.append('authenticity_token', this.props.csrfToken)
  //   if (this.props.croppedData) {
  //     formData.append('image[croppedData]', JSON.stringify(this.props.croppedData))
  //   }

  //   this.setState({
  //     complete: 'start'
  //   })

  //   xhr.open('POST', '/images');
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //       self.setState({
  //         complete: 'success'
  //       })
  //       console.log('upload success');
  //     } else {
  //       self.setState({
  //         complete: 'error'
  //       })
  //       console.log('upload error');
  //     }
  //   };

  //   xhr.onloadstart = function() {
  //     self.setState({
  //       imageName: ''
  //     })
  //   }

  //   xhr.upload.onprogress = function(event) {
  //     if (event.lengthComputable) {
  //       let progressComplete = (event.loaded / event.total * 100 - 5 | 0);
  //       self.setState({
  //         progress: progressComplete
  //       })
  //     }
  //   };

  //   xhr.send(formData);
  }

  render() {
    const { title, desc, validForm } = this.props;

    return (
      <form className="col s12" method="post" acceptCharset="UTF-8" encType='multipart/form-data' data-remote="true" onSubmit={ this.handleSubmit.bind(this) }>
        <div className="row">
          <div className="input-field col s12">
            <input placeholder="Title" name="image[title]" type="text" className="validate" value={ title } onChange={ this.handleChange.bind(this) } />
            <label htmlFor="first_name">Title</label>
          </div>
          <div className="input-field col s12">
            <input name="image[desc]" type="text" className="validate" value={ desc } onChange={ this.handleChange.bind(this) } />
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
        </div>
      </form>
    );
  }
}
