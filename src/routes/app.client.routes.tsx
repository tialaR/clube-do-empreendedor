import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import ClientDashboard from '../pages/ClientDashboard';

import { colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const DefaultView = () => <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Clube do empreendedor</Text></View>;

type TabBarIconProps = {
    color: string;
}

export function AppClientRoutes() {
  return (
    <Tab.Navigator
        initialRouteName="ClientDashboard"
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
          name="Notifications" component={DefaultView} 
        />
      <Tab.Screen
        options={{
            tabBarIcon: ({ color }: TabBarIconProps) => (
              <Icon name="home" color={color} size={22} />
            )}}
        name="ClientDashboard" component={ClientDashboard} 
        />
      <Tab.Screen 
        options={{
            tabBarIcon: ({ color }: TabBarIconProps) => (
              <Icon name="bell" color={color} size={22} />
        )}}
        name="Settings" component={DefaultView} 
      />
    </Tab.Navigator>
  );
}