import React from 'react';
import {enableScreens} from 'react-native-screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ClientProductDetailModalProvider} from '../hooks/useClientProductDetailModal';

import ClientDashboard from '../pages/ClientDashboard';
import ClientNotifications from '../pages/ClientNotifications';
import ClientProfile from '../pages/ClientProfile';

import {SvgIcon} from '../components/SvgIcon';

import {colors} from '../styles/colors';
import RegisterClient from '../pages/RegisterClient';

enableScreens();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ClientDashboardWithProductDetailModalProvider = () => (
  <ClientProductDetailModalProvider>
    <ClientDashboard />
  </ClientProductDetailModalProvider>
);

type TabBarIconProps = {
  color: string;
};

function ClientDashboardTabs() {
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
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}: TabBarIconProps) => (
            <SvgIcon name="userCircle" color={color} width={30} height={30} />
          ),
        }}
        name="Profile"
        component={ClientProfile}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}: TabBarIconProps) => (
            <SvgIcon name="homeOutline" color={color} width={30} height={30} />
          ),
        }}
        name="ClientDashboard"
        component={ClientDashboardWithProductDetailModalProvider}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}: TabBarIconProps) => (
            <SvgIcon
              name="notificationOutline"
              color={color}
              width={30}
              height={30}
            />
          ),
        }}
        name="Notifications"
        component={ClientNotifications}
      />
    </Tab.Navigator>
  );
}

export const AppClientRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="ClientDashboardTabs"
        component={ClientDashboardTabs}
      />

      <Stack.Screen name="RegisterClient" component={RegisterClient} />
    </Stack.Navigator>
  );
};
