import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import App from '../containers/APP';

export default (props) => {
  const store = ReactOnRails.getStore('appStore');
  return (
    <Provider store={ store }>
      <App {...props} />
    </Provider>
    );
};
