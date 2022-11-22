import React from 'react';
import store from './src/store';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native';
import App from './App';

const RootApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootApp;
