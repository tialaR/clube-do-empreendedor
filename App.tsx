
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

import AppProvider from './src/hooks';

const App = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
