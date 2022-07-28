import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

import api from '../services/api';
import ServiceClient from '../services/client/client.service';
import ServiceCompany from '../services/company/company.service';

type AuthLoginState = {
  userId: number;
  token: string;
  isClient: boolean;
};

type SignUpCredentials = {
  username: string;
  email: string;
  password: string;
  cpf?: string;
  cnpj?: string;
};

type SignInCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  userId: number;
  isClient: boolean;
  isLoginError: boolean;
  isLoginLoading: boolean;
  isSignUpClientLoading: boolean;
  isSignUpClientError: boolean;
  isSignUpClientSuccess: boolean;
  isSignUpCompanyloading: boolean;
  isSignUpCompanyError: boolean;
  isSignUpCompanySuccess: boolean;
  signUp(creditials: SignUpCredentials): Promise<void>;
  signIn(creditials: SignInCredentials): Promise<void>;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const {
    postSignUpClient,
    isLoading: isSignUpClientLoading,
    isError: isSignUpClientError,
    isSuccess: isSignUpClientSuccess,
  } = ServiceClient.usePostSignUpClient();

  const {
    postSignUpCompany,
    isLoading: isSignUpCompanyloading,
    isError: isSignUpCompanyError,
    isSuccess: isSignUpCompanySuccess,
  } = ServiceCompany.usePostSignUpCompany();

  const [loginData, setLoginData] = useState<AuthLoginState>(
    {} as AuthLoginState,
  );
  const [isLoginLoading, setIsLoginLoading] = useState(true);
  const [isLoginError, setIsLoginError] = useState(false);

  // AsyncStorage
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      setIsLoginLoading(true);
      const [token, userId, isClient] = await AsyncStorage.multiGet([
        '@EntrepreneursClub:token',
        '@EntrepreneursClub:userId',
        '@EntrepreneursClub:isClient',
      ]);

      if (token[1] && userId[1] && isClient[1]) {
        api.defaults.headers.common['Authorization'] = `Token ${token[1]}`;

        setLoginData({
          token: token[1],
          userId: JSON.parse(userId[1]),
          isClient: JSON.parse(isClient[1]),
        });
      }

      setIsLoginLoading(false);
    }

    loadStorageData();
  }, []);

  // Cadastro
  const signUp = useCallback(
    async ({username, email, password, cpf, cnpj}: SignUpCredentials) => {
      if (cpf) {
        const client = {
          username,
          email,
          password,
          cpf,
        };
        postSignUpClient(client);
      }

      if (cnpj) {
        const clientStore = {
          username,
          email,
          password,
          cnpj,
        };

        postSignUpCompany(clientStore);
      }
    },
    [],
  );

  // Login
  const signIn = useCallback(
    async ({username, password}: SignInCredentials) => {
      setIsLoginLoading(true);

      await api
        .post('/accounts/login', {
          username,
          password,
        })
        .then(response => {
          Alert.alert(JSON.stringify(response.data));
          const {token, user_id: userId, is_cliente: isClient} = response.data;

          const saveTokenAndUserDataInLocalStorage = async () => {
            await AsyncStorage.multiSet([
              ['@EntrepreneursClub:token', token],
              ['@EntrepreneursClub:userId', JSON.stringify(userId)],
              ['@EntrepreneursClub:isClient', JSON.stringify(isClient)],
            ]);
          };

          saveTokenAndUserDataInLocalStorage();

          api.defaults.headers.common['Authorization'] = `Token ${token}`;

          setLoginData({token, userId, isClient});
        })
        .catch((err: any) => {
          setIsLoginError(!!err);
        })
        .finally(() => {
          setIsLoginLoading(false);
        });
    },
    [],
  );

  // Logout
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove([
      '@EntrepreneursClub:token',
      '@EntrepreneursClub:userId',
      '@EntrepreneursClub:isClient',
    ]);

    setLoginData({} as AuthLoginState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userId: loginData.userId,
        isClient: loginData.isClient,
        isLoginLoading,
        isLoginError,
        isSignUpClientLoading,
        isSignUpClientError,
        isSignUpClientSuccess,
        isSignUpCompanyloading,
        isSignUpCompanyError,
        isSignUpCompanySuccess,
        signUp,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
