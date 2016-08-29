import { connect } from 'react-redux'
import { increaseAction } from '../actions'
import Counter from '../components/Counter'

const mapStateToProps = (state) => {
  return {
    value: state.counter.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIncreaseClick: () => {
      dispatch(increaseAction())
    }
  }
}

const PhotoGalleryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

export default PhotoGalleryContainer
