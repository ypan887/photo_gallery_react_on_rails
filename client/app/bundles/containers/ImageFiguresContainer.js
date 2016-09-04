import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import ImageFigureWidget from '../components/ImageFigureWidget'
import { arrange } from '../actions'

class ImageFiguresContainer extends React.Component {

  componentDidMount() {
    let stageDOM = this.stageNode
    const stageW = stageDOM.scrollWidth;
    const stageH = stageDOM.scrollHeight;
    const imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    const imgW = imgFigureDOM.scrollWidth;
    const imgH = imgFigureDOM.scrollHeight;

    let posConstant= {
      stageW: stageW,
      stageH: stageH,
      imgW: imgW,
      imgH: imgH
    };
    //this.props.getImageSize(imgW, imgH);
    this.props.arrangePics(0, posConstant)
  }

  render() {
    let imgFigures = [];
    const imageDatas = this.props.images;
    let imagesPosition = this.props.imagesPosition
    let styleObj = {};
    let imgFigureClassName = 'img-figure';

    imageDatas.forEach((value, index) => {
      let imagePosition = imagesPosition[index];
      if (imagePosition.pos) {
        styleObj = imagePosition.pos;
      }

      if (imagePosition.rotate) {
        (['Moz', 'ms', 'Webkit', '']).forEach((value) => {
          styleObj[value + 'Transform'] = 'rotate(' + imagePosition.rotate + 'deg)';
        });
      }

      if (imagePosition.isInverse) {
        imgFigureClassName += ' is-inverse';
      }

      if (imagePosition.isCenter) {
        styleObj.zIndex = 11;
      }

      imgFigures.push(<ImageFigureWidget
                      data={ value }
                      key={ index }
                      styleObj={ styleObj }
                      imgFigureClassName={ imgFigureClassName }
                      ref={ 'imgFigure' + index }
                      />);
    });

    return (
      <section className='img-sec' ref={ (node) => this.stageNode = node }>
        { imgFigures }
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imagesPosition: state.imagesPosition
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    arrangePics: (centerIndex, posConstant) => {
      dispatch(arrange(centerIndex, posConstant))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageFiguresContainer)
