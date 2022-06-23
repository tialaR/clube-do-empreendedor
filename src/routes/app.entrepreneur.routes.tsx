import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import EntrepreneurDashboard from '../pages/EntrepreneurDashboard';
import EntrepreneurNotifications from '../pages/EntrepreneurNotifications';
import EntrepreneurProfile from '../pages/EntrepreneurProfile';
import EntrepreneurRegisterCupom from '../pages/EntrepreneurRegisterCupom';

import { DiscountClientsModalProvider } from '../hooks/useDiscountClientsModal';

import { colors } from '../styles/colors';
import EntrepreneurRegisterCupomConfirmation from '../pages/EntrepreneurRegisterCupomConfirmation';

enableScreens();
const Stack = createNativeStackNavigator();

const EntrepreneurDashboardWithDiscountClientsModalProvider = () => (
  <DiscountClientsModalProvider>
    <EntrepreneurDashboard/>
  </DiscountClientsModalProvider>
);

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
    color: string;
}

export function TabEntrepreneurRoutes() {
  return (
    <Tab.Navigator
        initialRouteName="TabEntrepreneurDashboard"
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.white,
            tabBarInactiveTintColor: colors.indigoA100,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: colors.indigoA200,
                borderTopColor: colors.indigoA200,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                elevation: 4,
            }
        }}
    >
      <Tab.Screen 
        options={{
          tabBarIcon: ({ color }: TabBarIconProps) => (
            <Icon name="user" color={color} size={22} />
          )}} 
          name="TabProfile" component={EntrepreneurProfile} 
        />
      <Tab.Screen
        options={{
            tabBarIcon: ({ color }: TabBarIconProps) => (
              <Icon name="home" color={color} size={22} />
            )}}
        name="TabEntrepreneurDashboard" component={EntrepreneurDashboardWithDiscountClientsModalProvider} 
        />
      <Tab.Screen 
        options={{
            tabBarIcon: ({ color }: TabBarIconProps) => (
              <Icon name="bell" color={color} size={22} />
        )}}
        name="TabNotifications" component={EntrepreneurNotifications} 
      />
    </Tab.Navigator>
  );
}

export const AppEntrepreneurRoutes = () => {
  return (
    <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
    >
      <Stack.Screen name="EntrepreneurDashboard" component={TabEntrepreneurRoutes} />

      <Stack.Screen name="EntrepreneurRegisterCupom" component={EntrepreneurRegisterCupom} />
      <Stack.Screen name="EntrepreneurRegisterCupomConfirmation" component={EntrepreneurRegisterCupomConfirmation} />
    </Stack.Navigator>
  );
}