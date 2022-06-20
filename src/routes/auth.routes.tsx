import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from '../pages/SignIn';
import Wellcome from '../pages/Wellcome';

enableScreens();
const Stack = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
      <Stack.Screen name="Wellcome" component={Wellcome} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
}