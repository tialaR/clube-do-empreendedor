import React, { ReactNode } from 'react';
import { AuthProvider } from './useAuth';

type Props = {
    children: ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

export default AppProvider;