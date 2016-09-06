import React from 'react'
import { connect } from 'react-redux'
import Modal from 'boron/DropModal'
import FontAwesome from 'react-fontawesome';
import { getInput, getImage, cropImage, postUpload } from '../actions'
import UploadWidget from '../components/UploadWidget'
import CropComponent from '../components/CropComponent'

let modalStyle = {
  minWidth: '60%'
};

class UploadContainer extends React.Component {
  showModal() {
    this.refs.modal.show();
  }

  hideModal() {
    this.refs.modal.hide();
  }

  _cropImage(croppedData) {
    this.props.cropImage({croppedData: croppedData})
  }

  render() {
    const { input, image, crop, complete} = this.props.uploadImage
    const validForm = input.title && input.desc && image.imageName && crop.croppedData;

    let styleObj = {};
    if (image.imagePreviewUrl) {
      styleObj = {
        height: 400,
        width: '100%'
      };
    }

    let formContainerClassName = 'container';
    let completeContainerClassName = 'complete-container';
    let progressBarClassName = 'progress-bar';
    let errorContainerClassName = 'error-container';

    if (complete === 'success') {
      formContainerClassName += ' complete';
      completeContainerClassName += ' complete';
    }

    if (complete === 'error') {
      formContainerClassName += ' complete';
      errorContainerClassName += ' error'
    }

    if (complete === 'start') {
      progressBarClassName += ' start';
    }

    return (
      <div>
        <div id='upload-button'>
          <FontAwesome onClick={ this.showModal.bind(this) }
                       name='plus-circle'
                       size='3x' />
        </div>
        <Modal ref="modal" modalStyle={ modalStyle }>
          <div className={ formContainerClassName }>
            <FontAwesome onClick={ this.hideModal.bind(this) }
                         name='times'
                         size='2x'
                         id='close-button' />
            <UploadWidget { ...this.props }
                          validForm={ validForm }
                          progressBarClassName={ progressBarClassName } />
            <div className='preview-img col s12'>
              <CropComponent _cropImage={ this._cropImage.bind(this) }
                             img={ image.imagePreviewUrl }
                             styleObj={ styleObj } />
            </div>
          </div>
          <a className={ completeContainerClassName } href="/">
            <FontAwesome name='check-circle-o' />
          </a>
          <a className={ errorContainerClassName } href="/">
            <FontAwesome name='exclamation-circle' />
          </a>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    uploadImage: state.uploadImage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInput: (input) => {
      dispatch(getInput(input));
    },
    getImage: (image) => {
      dispatch(getImage(image));
    },
    cropImage: (croppedData) => {
      dispatch(cropImage(croppedData))
    },
    postUpload: () => {
      dispatch(postUpload())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadContainer)
