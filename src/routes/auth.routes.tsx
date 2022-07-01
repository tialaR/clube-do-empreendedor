import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import Wellcome from '../pages/Wellcome';
import RegisterClient from '../pages/RegisterClient';
import RegisterCompany from '../pages/RegisterCompany';
import RecoverPassword from '../pages/RecoverPassword';
import RecoverPasswordConfirmation from '../pages/RecoverPasswordConfirmation';

import {AppClientRoutes} from './app.client.routes';
import {AppCompanyRoutes} from './app.company.routes';

enableScreens();
const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Wellcome" component={Wellcome} />
      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen name="RegisterClient" component={RegisterClient} />
      <Stack.Screen name="RegisterCompany" component={RegisterCompany} />

      <Stack.Screen name="RecoverPassword" component={RecoverPassword} />
      <Stack.Screen
        name="RecoverPasswordConfirmation"
        component={RecoverPasswordConfirmation}
      />

      <Stack.Screen name="AppClientRoutes" component={AppClientRoutes} />
      <Stack.Screen name="AppCompanyRoutes" component={AppCompanyRoutes} />
    </Stack.Navigator>
  );
}
