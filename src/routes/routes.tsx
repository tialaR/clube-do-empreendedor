import React from 'react';

import {AuthRoutes} from './auth.routes';
import {AppClientRoutes} from './app.client.routes';
import {AppCompanyRoutes} from './app.company.routes';

import {useAuth} from '../hooks/useAuth';

import {SplasScreenAux} from '../styles/globalStyles';

const AppRoutes: React.FC = () => {
  const {isClient, userId, loading} = useAuth();

  if (loading) {
    return <SplasScreenAux />;
  }

  if (userId) {
    return isClient ? <AppClientRoutes /> : <AppCompanyRoutes />;
  } else {
    return <AuthRoutes />;
  }
};

export default AppRoutes;
