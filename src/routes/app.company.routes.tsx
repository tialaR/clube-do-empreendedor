import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CompanyDashboard from '../pages/CompanyDashboard';
import CompanyNotifications from '../pages/CompanyNotifications';
import CompanyProfile from '../pages/CompanyProfile';
import CompanyRegisterCupom from '../pages/CompanyRegisterCupom';

import {CompanyDiscountClientsModalProvider} from '../hooks/useCompanyDiscountClientsModal';

import CompanyRegisterCupomConfirmation from '../pages/CompanyRegisterCupomConfirmation';
import CompanyEditProductDetail from '../pages/CompanyEditProductDetail';
import CompanyRegisterProduct from '../pages/CompanyRegisterProduct';

import {colors} from '../styles/colors';

enableScreens();
const Stack = createNativeStackNavigator();

const CompanyDashboardWithDiscountClientsModalProvider = () => (
  <CompanyDiscountClientsModalProvider>
    <CompanyDashboard />
  </CompanyDiscountClientsModalProvider>
);

const Tab = createBottomTabNavigator();

type TabBarIconProps = {
  color: string;
};

export function TabCompanyRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="TabCompanyDashboard"
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
            <Icon name="user" color={color} size={22} />
          ),
        }}
        name="TabProfile"
        component={CompanyProfile}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}: TabBarIconProps) => (
            <Icon name="home" color={color} size={22} />
          ),
        }}
        name="TabCompanyDashboard"
        component={CompanyDashboardWithDiscountClientsModalProvider}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color}: TabBarIconProps) => (
            <Icon name="bell" color={color} size={22} />
          ),
        }}
        name="TabNotifications"
        component={CompanyNotifications}
      />
    </Tab.Navigator>
  );
}

export const AppCompanyRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CompanyDashboard" component={TabCompanyRoutes} />

      <Stack.Screen
        name="CompanyRegisterCupom"
        component={CompanyRegisterCupom}
      />
      <Stack.Screen
        name="CompanyRegisterCupomConfirmation"
        component={CompanyRegisterCupomConfirmation}
      />

      <Stack.Screen
        name="CompanyEditProductDetail"
        component={CompanyEditProductDetail}
      />

      <Stack.Screen
        name="CompanyRegisterProduct"
        component={CompanyRegisterProduct}
      />
    </Stack.Navigator>
  );
};
