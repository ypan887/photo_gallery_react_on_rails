import * as types from '../constants/ActionTypes'

export function arrange(centerIndex, posConstant) {
  return {
    type: types.ARRANGE,
    centerIndex: centerIndex,
    posConstant: posConstant
  }
}

export function inverse(index) {
  return {
    type: types.INVERSE,
    index: index
  }
}

export function getInput(input) {
  return {
    type: types.GETINPUT,
    input: input
  }
}

export function getImage(image) {
  return {
    type: types.GETIMAGE,
    image: image
  }
}

export function cropImage(croppedData) {
  return {
    type: types.CROPIMAGE,
    croppedData: croppedData
  }
}

export function initialProgressBar() {
  return {
    type: types.INITIALPROGRESSBAR
  }
}

export function completeProgressBar() {
  return {
    type: types.COMPLETEPROGRESSBAR
  }
}

export function errorProgressBar() {
  return {
    type: types.ERRORPROGRESSBAR
  }
}

export function emptyInput() {
  return {
    type: types.EMPTYINPUT
  }
}

export function setProgress(progressComplete) {
  return {
    type: types.SETPROGRESS,
    progressComplete: progressComplete
  }
}

export function postUpload(csrfToken) {
  return (dispatch, getState) => {
    const { input, image, crop } = getState().uploadImage
    const validForm = input.title && input.desc && image.imageName && crop.croppedData;

    if (!validForm) {
      return null;
    }

    let formData = new FormData();
    formData.append('image[title]', input.title);
    formData.append('image[desc]', input.desc);
    formData.append('image[image]', image.image);
    formData.append('authenticity_token', csrfToken)
    formData.append('image[croppedData]', JSON.stringify(crop.croppedData))

    return dispatch(sendUpload(dispatch, formData))
  }
}

export function sendUpload(dispatch, formData) {
  dispatch(initialProgressBar());
  let xhr = new XMLHttpRequest();

  xhr.open('POST', '/images');
  xhr.onload = () => {
    if (xhr.status === 200) {
      dispatch(completeProgressBar());
      console.log('upload success');
    } else {
      dispatch(errorProgressBar());
      console.log('upload error');
    }
  };

  xhr.onloadstart = () => {
    dispatch(emptyInput())
  }

  xhr.upload.onprogress = (event)=> {
    if (event.lengthComputable) {
      let progressComplete = (event.loaded / event.total * 100 - 5 | 0);
      dispatch(setProgress(progressComplete));
    }
  };

  xhr.send(formData);
}
