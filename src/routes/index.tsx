import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AuthRoutes } from './auth.routes';
import { AppClientRoutes } from './app.client.routes';
import { AppEntrepreneurRoutes } from './app.entrepreneur.routes';

import { useAuth } from '../hooks/useAuth';

import { colors } from '../styles/colors';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.indigoA200,
        }}
      >
        <ActivityIndicator size="small" color={colors.gray50} />
      </View>
    );
  }

  if (!user?.name) {
    return user?.type ===  'client' ? <AppClientRoutes /> : <AppEntrepreneurRoutes />;
  } else {
    return <AuthRoutes />;
  }
};

export default Routes;