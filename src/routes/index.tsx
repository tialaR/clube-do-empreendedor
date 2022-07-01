import React, {useMemo} from 'react';

import {useAuth} from '../hooks/useAuth';

import SplashScreen from '../components/SplashScreen';
import AppRoutes from './routes';

const Routes: React.FC = () => {
  const {loading} = useAuth();

  const isAppInitialized = useMemo(() => !loading, [loading]);

  return (
    <>
      <AppRoutes />
      <SplashScreen isAppInitialized={isAppInitialized} />
    </>
  );
};

export default Routes;
