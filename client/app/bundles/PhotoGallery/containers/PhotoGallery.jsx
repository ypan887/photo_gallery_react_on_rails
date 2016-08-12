import React from 'react';
import ReactDOM from 'react-dom';

function getRangeRandom(low, high) {
  return Math.ceil(Math.random() * (high - low) + low);
}

function getRotateRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

class ImgFigure extends React.Component {
  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    let styleObj = {};
    let imgFigureClassName = 'img-figure';

    if (this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    if (this.props.arrange.rotate) {
      (['Moz', 'ms', 'Webkit', '']).forEach((value) => {
        styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      });
    }

    if (this.props.arrange.isInverse) {
      imgFigureClassName += ' is-inverse';
    }

    if (this.props.arrange.isCenter) {
      styleObj.zIndex = 11;
    }

    return (
      <figure className={ imgFigureClassName } style={ styleObj } onClick={ this.handleClick.bind(this) }>
        <img src={ this.props.data.url } alt={ this.props.data.title } />
        <figcaption>
          <h2 className="img-title">{ this.props.data.title }</h2>
          <div className='img-back' onClick={ this.handleClick.bind(this) }>
            <p>
              { this.props.data.desc }
            </p>
          </div>
        </figcaption>
      </figure>
      );
  }
}

class ControllerUnit extends React.Component {
  handleClick(e) {
    if (this.props.arrange.isCenter) {
      this.props.inverse();
    } else {
      this.props.center();
    }

    e.preventDefault;
    e.stopPropagation;
  }

  render() {
    let controllerUnitClassName = 'controller-unit';

    if (this.props.arrange.isCenter) {
      controllerUnitClassName += ' is-center';

      if (this.props.arrange.isInverse) {
        controllerUnitClassName += ' is-inverse';
      }
    }
    return (
      <span className={ controllerUnitClassName } onClick={ this.handleClick.bind(this) }></span>
      );
  }
}


// Simple example of a React "smart" component
export default class PhotoGallery extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.Constant = {
      centerPos: {
        left: 0,
        right: 0
      },
      hPosRange: {
        leftSecX: [0, 0],
        rightSecX: [0, 0],
        y: [0, 0]
      },
      vPosRange: {
        x: [0, 0],
        topY: [0, 0]
      }
    };

    this.state = {
      imgsArrangeArr: []
    };
  }

  inverse(index) {
    return () => {
      let imgsArrangeArr = this.state.imgsArrangeArr;

      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

      this.setState({
        imgsArrangeArr: imgsArrangeArr
      })
    }
  }

  center(index) {
    return () => {
      this.rearrange(index);
    }
  }

  rearrange(centerIndex) {
    let imgsArrangeArr = this.state.imgsArrangeArr;
    let Constant = this.Constant;
    let centerPos = Constant.centerPos;
    let hPosRange = Constant.hPosRange;
    let vPosRange = Constant.vPosRange;
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

    this.setState({
      imgsArrangeArr: imgsArrangeArr
    });
  }

  componentDidMount() {
    let stageDOM = this.stage;
    let stageW = stageDOM.scrollWidth;
    let stageH = stageDOM.scrollHeight;
    let halfStageW = Math.ceil(stageW / 2);
    let halfStageH = Math.ceil(stageH / 2);

    let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    let imgW = imgFigureDOM.scrollWidth;
    let imgH = imgFigureDOM.scrollHeight;
    let halfImgW = Math.ceil(imgW / 2);
    let halfImgH = Math.ceil(imgH / 2);

    this.Constant.centerPos = {
      left: halfStageW - halfImgW,
      top: halfStageH - halfImgH
    }

    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
    this.Constant.hPosRange.y[0] = -halfImgH;
    this.Constant.hPosRange.y[1] = stageH - halfImgH;

    this.Constant.vPosRange.topY[0] = -halfImgH;
    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
    this.Constant.vPosRange.x[0] = halfStageW - imgW;
    this.Constant.vPosRange.x[1] = halfStageW;

    this.rearrange(0);
  }

  render() {
    let controllerUnits = [];
    let imgFigures = [];
    let imageDatas = this.props.data;

    imageDatas.forEach((value, index) => {

      if (!this.state.imgsArrangeArr[index]) {
        this.state.imgsArrangeArr[index] = {
          pos: {
            left: 0,
            top: 0
          },
          rotate: 0,
          isInverse: false,
          isCenter: false
        };
      }

      imgFigures.push(<ImgFigure data={ value } key={ index } arrange={ this.state.imgsArrangeArr[index] } ref={ 'imgFigure' + index } inverse={ this.inverse(index) } center={ this.center(index) }
                      />);

      controllerUnits.push(<ControllerUnit key={ index } arrange={ this.state.imgsArrangeArr[index] } inverse={ this.inverse(index) } center={ this.center(index) } />);
    });

    return (
      <section className="index stage" ref={ (node) => this.stage = node }>
        <section className="img-sec">
          { imgFigures }
        </section>
        <nav className="controller-nav">
          { controllerUnits }
        </nav>
      </section>
      );
  }
}
