
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';
import { colors } from './src/styles/colors';

import AppProvider from './src/hooks';
import Register from './src/pages/Register';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.indigoA200}
        translucent
      />
      <AppProvider>
        {/* <Routes /> */}
        <Register />
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
