import React, {
    createContext,
    useCallback,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  
  type User = {
    document: string;
    type: 'CPF' | 'CNPJ';
  }
  
  type AuthState = {
    token: string;
    user: User;
  }

  type SignInCredentials = {
    documentNumber: string;
    documentType: 'CPF' | 'CNPJ';
    password: string;
  }
  
  type AuthContextData = {
    user: User;
    signIn(creditials: SignInCredentials): Promise<void>;
    updateUser(user: User): Promise<void>;
    signOut(): void;
    loading: boolean;
  }
  
  const AuthContext = createContext<AuthContextData>({} as AuthContextData);

  type AuthProviderProps = {
      children: ReactNode;
  }
  
  const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true);
  
    // AsyncStorage
    useEffect(() => {
      async function loadStorageData(): Promise<void> {
        const [token, user] = await AsyncStorage.multiGet([
          '@EntrepreneursClub:token',
          '@EntrepreneursClub:user',
        ]);
  
        if (token[1] && user[1]) {
          // api.defaults.headers.authorization = `Bearer ${token[1]}`;
  
          setData({ token: token[1], user: JSON.parse(user[1]) });
        }
  
        setLoading(false);
      }
  
      loadStorageData();
    }, []);

    // Login
  const signIn = useCallback(async ({ documentType, documentNumber, password }: SignInCredentials) => {
    // Criando sessão de usuário no back-end
    // const response = await api.post('sessions', {
    //   email,
    //   password,
    // });

    // const { token, user } = response.data;
      const token = 'c72b7c32037a4082062c1c6b566296c1';
      const user = {
        document: documentNumber,
        type: documentType,
      };

    // Salvando no localStorage:
    await AsyncStorage.multiSet([
      ['@EntrepreneursClub:token', token],
      ['@EntrepreneursClub:user', JSON.stringify(user)],
    ]);

    /* Definindo como padrão para todas as requisições da aplicação um cabeçalho com o nome
       Authorization contendo o valor do token */
    // api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);
  
    // Atualiza os dados do usuário (o token continua o mesmo)
    const updateUser = useCallback(
      async (user: User) => {
        await AsyncStorage.setItem('@EntrepreneursClub:user', JSON.stringify(user));

        setData({
          token: data.token,
          user,
        });
      },
      [setData, data.token],
    );
  
    // Logout
    const signOut = useCallback(async () => {
      // Removendo do localStorage:
      await AsyncStorage.multiRemove([
        '@EntrepreneursClub:token', 
        '@EntrepreneursClub:user'
      ]);

      // Removendo da variável:
      setData({} as AuthState);
    }, []);
  
    return (
      <AuthContext.Provider
        value={{ user: data.user, loading, signIn, updateUser, signOut }}
      >
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
  
  export { AuthProvider, useAuth };