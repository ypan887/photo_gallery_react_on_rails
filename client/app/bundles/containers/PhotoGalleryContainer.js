import React from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import ImageFigureWidget from '../components/ImageFigureWidget'
import ControllerUnitWidget from '../components/ControllerUnitWidget'
import { arrange, inverse } from '../actions'

class PhotoGalleryContainer extends React.Component {

  constructor(props) {
    super(props);
    this.posConstant = {};
  }

  componentDidMount() {
    let stageDOM = this.stageNode;
    const stageW = stageDOM.scrollWidth;
    const stageH = stageDOM.scrollHeight;
    const imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
    const imgW = imgFigureDOM.scrollWidth;
    const imgH = imgFigureDOM.scrollHeight;

    this.posConstant= {
      stageW: stageW,
      stageH: stageH,
      imgW: imgW,
      imgH: imgH
    };

    this.props.arrangePics(0, this.posConstant);
  }

  center(index) {
    return () => {
      this.props.arrangePics(index, this.posConstant);
    }
  }

  inverse(index) {
    return () => {
      this.props.inversePics(index);
    }
  }

  render() {
    let imgFigures = [];
    let controllerUnits = [];
    let styleObj = {};

    const imageDatas = this.props.images;
    const imagesPosition = this.props.imagesPosition;

    imageDatas.forEach((value, index) => {
      let imgFigureClassName = 'img-figure';
      let controllerUnitClassName = 'controller-unit';
      let imagePosition = imagesPosition[index];
      if (imagePosition.pos) {
        styleObj = imagePosition.pos;
      }

      if (imagePosition.rotate) {
        (['Moz', 'ms', 'Webkit', '']).forEach((value) => {
          styleObj[value + 'Transform'] = 'rotate(' + imagePosition.rotate + 'deg)';
        });
      }

      if (imagePosition.isCenter) {
        controllerUnitClassName += ' is-center';
        styleObj.zIndex = 11;

        if (imagePosition.isInverse) {
          controllerUnitClassName += ' is-inverse';
          imgFigureClassName += ' is-inverse';
        }
      }

      imgFigures.push(<ImageFigureWidget data={ value }
                                         key={ index }
                                         styleObj={ styleObj }
                                         arrange= { imagePosition }
                                         inverse={ this.inverse(index) }
                                         center={ this.center(index) }
                                         imgFigureClassName={ imgFigureClassName }
                                         ref={ 'imgFigure' + index } />);

      controllerUnits.push(<ControllerUnitWidget key={ index }
                                                 arrange= { imagePosition }
                                                 inverse={ this.inverse(index) }
                                                 center={ this.center(index) }
                                                 controllerUnitClassName={ controllerUnitClassName } />);
    });

    return (
      <section className="index stage" ref={ (node) => this.stageNode = node }>
        <section className='img-sec'>
          { imgFigures }
        </section>
        <div className="controller-nav">
          { controllerUnits }
        </div>
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
      dispatch(arrange(centerIndex, posConstant));
    },
    inversePics: (index)=>{
      dispatch(inverse(index));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhotoGalleryContainer)
