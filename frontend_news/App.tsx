import React from 'react';
import AppNavigator from './app/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './app/redux/store';

const App = () => {

  return  <Provider store={store}><AppNavigator /></Provider>;
};

export default App;