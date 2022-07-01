import React from 'react';

import {AuthRoutes} from './auth.routes';
import {AppClientRoutes} from './app.client.routes';
import {AppCompanyRoutes} from './app.company.routes';

import {useAuth} from '../hooks/useAuth';

import {SplasScreenAux} from '../styles/globalStyles';

const AppRoutes: React.FC = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <SplasScreenAux />;
  }

  if (user?.document) {
    return user?.type === 'CPF' ? <AppClientRoutes /> : <AppCompanyRoutes />;
  } else {
    return <AuthRoutes />;
  }
};

export default AppRoutes;
