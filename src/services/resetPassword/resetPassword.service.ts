import {useState} from 'react';

import api from '../api';

import {ResetEmailResponse, ResetPasswordRequest} from './types';

const usePostResetEmail = () => {
  const [data, setData] = useState<ResetEmailResponse | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const postResetEmail = async ({email}: {email: string}) => {
    setIsLosding(true);
    try {
      const response = await api.post<ResetEmailResponse>(
        'usuarios/request-reset-email/',
        {
          email: email,
        },
      );
      setData(response.data);
    } catch (err) {
      setIsError(!!err);
    } finally {
      setIsLosding(false);
    }
  };

  return {
    postResetEmail,
    response: data,
    isLoading,
    isError,
  };
};

const usePatchResetPassword = () => {
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const postResetPassword = async ({
    password,
    token,
    uidb64,
  }: ResetPasswordRequest) => {
    setIsLosding(true);
    try {
      const response = await api.patch('usuarios/password-reset-complete', {
        password: password,
        token: token,
        uidb64: uidb64,
      });
      setData(response.data);
    } catch (err) {
      setIsError(!!err);
    } finally {
      setIsLosding(false);
    }
  };

  return {
    postResetPassword,
    response: data,
    isLoading,
    isError,
  };
};

const ServiceResetPassword = {
  usePostResetEmail,
  usePatchResetPassword,
};

export default ServiceResetPassword;
