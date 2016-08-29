import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import App from '../containers/APP';

export default (_props, _railsContext) => {
  const store = ReactOnRails.getStore('appStore');
  return (
    <Provider store={ store }>
      <App />
    </Provider>
    );
};
