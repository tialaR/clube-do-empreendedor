import React, {
    createContext,
    useCallback,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  
  type User = {
    id: string;
    name: string;
    type: string;
    email: string;
    avatarUrl: string;
  }
  
  type AuthState = {
    token: string;
    user: User;
  }
  
  type SignInCredentials = {
    email: string;
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
      // Criar um AsyncStorage (descomentar esse código p/ ir direto para a home)
      const token = 'c72b7c32037a4082062c1c6b566296c1';
      const user = {
        id: '1',
        name: 'Nelson dos Santos Mandela',
        type: 'client',
        email: 'nelson@africa.com',
        avatarUrl:
          'https://www.estudarfora.org.br/app/uploads/2018/07/Nelson-Mandela-em-Harvard-1.jpg',
      };
  
      setData({ token, user });
      setLoading(false);
    }, []);
  
    // Login
    const signIn = useCallback(async ({ email, password }: { email: string; password: string }) => {
      const token = 'c72b7c32037a4082062c1c6b566296c1';
      const user = {
        id: '1',
        name: 'Nelson dos Santos Mandela',
        type: 'client',
        email: 'nelson@africa.com',
        avatarUrl:
          'https://www.estudarfora.org.br/app/uploads/2018/07/Nelson-Mandela-em-Harvard-1.jpg',
      };
  
      setData({ token, user });
      setLoading(false);
    }, []);
  
    // Atualiza os dados do usuário
    const updateUser = useCallback(
      async (user: User) => {
        const token = 'c72b7c32037a4082062c1c6b566296c1';
  
        setData({
          token,
          user,
        });
      },
      [setData],
    );
  
    // Logout
    const signOut = useCallback(async () => {
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