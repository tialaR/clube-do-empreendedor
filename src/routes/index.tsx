import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { AuthRoutes } from './auth.routes';
import { AppClientRoutes } from './app.client.routes';
import { AppEntrepreneurRoutes } from './app.entrepreneur.routes';

// import { useAuth } from '../hooks/auth';

import { colors } from '../styles/colors';

const Routes: React.FC = () => {
    //const { user, loading } = useAuth();
    const user = { name: 'Fernanda', type: 'client' };
    const loading = false;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.gray100,
        }}
      >
        <ActivityIndicator size="small" color={colors.indigoA200} />
      </View>
    );
  }

  if (user) {
    return user?.type ===  'client' ? <AppClientRoutes /> : <AppEntrepreneurRoutes />;
  } else {
    return <AuthRoutes />;
  }
};

export default Routes;