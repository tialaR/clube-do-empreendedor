import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import EntrepreneurDashboard from '../pages/EntrepreneurDashboard';
import EntrepreneurNotifications from '../pages/EntrepreneurNotifications';
import EntrepreneurProfile from '../pages/EntrepreneurProfile';

import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
    color: string;
}

export function AppEntrepreneurRoutes() {
  return (
    <Tab.Navigator
        initialRouteName="EntrepreneurDashboard"
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
          name="Profile" component={EntrepreneurProfile} 
        />
      <Tab.Screen
        options={{
            tabBarIcon: ({ color }: TabBarIconProps) => (
              <Icon name="home" color={color} size={22} />
            )}}
        name="EntrepreneurDashboard" component={EntrepreneurDashboard} 
        />
      <Tab.Screen 
        options={{
            tabBarIcon: ({ color }: TabBarIconProps) => (
              <Icon name="bell" color={color} size={22} />
        )}}
        name="Notifications" component={EntrepreneurNotifications} 
      />
    </Tab.Navigator>
  );
}