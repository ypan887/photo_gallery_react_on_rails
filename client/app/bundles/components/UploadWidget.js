import React from 'react';
import ReactOnRails from 'react-on-rails';

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
    const csrfToken = ReactOnRails.authenticityToken();
    this.props.postUpload(csrfToken);
  }

  render() {
    debugger;
    const { title,
            desc,
            validForm,
            progress,
            progressBarClassName } = this.props;

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
          <div className="col s6">
            <progress className={ progressBarClassName } min="0" max="100" value={ progress } />
          </div>
        </div>
      </form>
    );
  }
}
