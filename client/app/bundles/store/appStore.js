import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers/index'

export default () => {
  const logger = createLogger();
  const composedStore = compose(
    applyMiddleware(ReduxThunk, logger)
  );
  return composedStore(createStore)(reducer, window.devToolsExtension && window.devToolsExtension());
};
