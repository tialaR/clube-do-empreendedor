import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableLatestRenderer} from 'react-native-maps';

import Routes from './src/routes';

import AppProvider from './src/hooks';
import {colors} from './src/styles/colors';

enableLatestRenderer();

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigoA200} />
      <NavigationContainer>
        <AppProvider>
          <Routes />
        </AppProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
