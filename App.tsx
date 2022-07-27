import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableLatestRenderer} from 'react-native-maps';
import {QueryClientProvider} from '@tanstack/react-query';

import Routes from './src/routes';

import AppProvider from './src/hooks';
import {colors} from './src/styles/colors';

import queryClient from './src/services/query';

enableLatestRenderer();

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.indigoA200} />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppProvider>
            <Routes />
          </AppProvider>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
};

export default App;
