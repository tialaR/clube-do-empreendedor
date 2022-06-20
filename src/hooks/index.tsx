import React, { ReactNode } from 'react';
import { AuthProvider } from './auth';

type Props = {
    children: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;