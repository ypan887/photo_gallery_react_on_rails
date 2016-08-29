import { createStore } from 'redux';
import reducer from '../reducers/index'

export default () => {
  return createStore(reducer, window.devToolsExtension && window.devToolsExtension());
};
