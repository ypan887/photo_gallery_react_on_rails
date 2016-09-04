import { combineReducers } from 'redux'

import { ARRANGE, INVERSE } from '../constants/ActionTypes'

const initialState = Array(16).fill('');

function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

function getRotateRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

function rearrange(state, centerIndex, posConstant) {
  const stageW = posConstant.stageW;
  const stageH = posConstant.stageH;
  const imgW = posConstant.imgW;
  const imgH = posConstant.imgH;
  const halfImgW = Math.ceil(imgW / 2);
  const halfImgH = Math.ceil(imgH / 2);
  const halfStageW = Math.ceil(stageW / 2);
  const halfStageH = Math.ceil(stageH / 2);

  let vPosRange = {
    x: [0, 0],
    topY: [0, 0]
  };

  let hPosRange = {
    leftSecX: [0, 0],
    rightSecX: [0, 0],
    y: [0, 0]
  }

  let centerPos = {
    left: halfStageW - halfImgW,
    top: halfStageH - halfImgH
  }

  hPosRange.leftSecX[0] = -halfImgW;
  hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
  hPosRange.rightSecX[0] = halfStageW + halfImgW;
  hPosRange.rightSecX[1] = stageW - halfImgW;
  hPosRange.y[0] = -halfImgH;
  hPosRange.y[1] = stageH - halfImgH;

  vPosRange.topY[0] = -halfImgH;
  vPosRange.topY[1] = halfStageH - halfImgH * 3;
  vPosRange.x[0] = halfStageW - imgW;
  vPosRange.x[1] = halfStageW;

  let imgsArrangeArr = state;
  let hPosRangeLeftSecX = hPosRange.leftSecX;
  let hPosRangeRightSecX = hPosRange.rightSecX;
  let hPosRangeY = hPosRange.y;
  let vPosRangeTopY = vPosRange.topY;
  let vPosRangeX = vPosRange.x;

  let imgsArrangeTopArr = [];
  let topImgNum = Math.floor(Math.random() * 2);

  let topImgSpliceIndex = 0;

  let imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

  imgsArrangeCenterArr[0] = {
    pos: centerPos,
    rotate: 0,
    isCenter: true
  };

  topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));

  imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

  imgsArrangeTopArr.forEach((value, index) => {
    imgsArrangeTopArr[index] = {
      pos: {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      },
      rotate: getRotateRandom(),
      isCenter: false
    }
  });

  for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
    let hPosRangeLORX = null;

    if (i < k) {
      hPosRangeLORX = hPosRangeLeftSecX;
    } else {
      hPosRangeLORX = hPosRangeRightSecX;
    }

    imgsArrangeArr[i] = {
      pos: {
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      },
      rotate: getRotateRandom(),
      isCenter: false
    }
  }

  if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
    imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
  }

  imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
  return imgsArrangeArr;
}

const imagesPosition = (state= initialState, action) => {
  switch (action.type) {
    case ARRANGE:
      return Object.assign([], state, rearrange(state, action.centerIndex, action.posConstant))
    case INVERSE:
      return state.map( (image, index) =>
                        index === action.index ?
                          Object.assign({}, image, { isInverse: !image.isInverse}) : image)
    default:
      return state
  }
}

export default imagesPosition
