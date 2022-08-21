import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';

import {baseURL} from '../../utils/constants';
import api from '../api';
import {
  FeaturedProduct,
  FeaturedProductResponse,
  MyDiscountProduct,
  MyDiscountProductResponse,
  ProductDetail,
  ScanQrCodeResponse,
  SiginUp,
  SignUpResponse,
  UserClientResponse,
  UserClientRequest,
  UserClient,
} from './types';
import queryClient from '../query';
import QueryConstants from '../queryConstants';

const usePostSignUpClient = () => {
  const [data, setData] = useState<SignUpResponse | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const postSignUpClient = async (client: SiginUp) => {
    setIsLosding(true);
    try {
      const response = await api.post<SignUpResponse>('signup/cliente', client);
      setData(response.data);
    } catch (err) {
      setIsError(!!err);
    } finally {
      setIsLosding(false);
    }
  };

  return {
    postSignUpClient,
    isSuccess: !!data?.token,
    isLoading,
    isError,
  };
};

const useGetUser = ({
  userId,
}: {
  userId: number;
}): {
  response: UserClient | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const query = useQuery([QueryConstants.USER_DETAIL, userId], async () => {
    if (userId) {
      const data = await api.get<UserClientResponse>(`clientes/${userId}/`);

      return {
        id: data?.data?.id,
        name: data?.data?.nome_completo,
        cpf: data?.data?.cpf,
        birthDate: data?.data?.data_nascimento,
        address: data?.data?.endereco,
        cep: data?.data?.cep,
        genre: data?.data?.genero,
        email: null,
        telephone: data?.data?.telefone_contato,
        user: data?.data?.user,
      };
    }

    return undefined;
  });

  return {
    response: query?.data,
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isRefetching,
    isRefetching: query.isRefetching,
    isError: query.isError,
  };
};

const usePatchUser = (): {
  patchUser: ({
    client,
    clientId,
  }: {
    client: UserClient;
    clientId: number;
  }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const mutation = useMutation(
    async ({client, clientId}: {client: UserClient; clientId: number}) => {
      let clientAux: UserClientRequest = {
        cpf: String(client.cpf),
        user: Number(client.user),
      };

      if (client?.name) {
        clientAux = {...clientAux, nome_completo: client.name};
      }
      if (client?.address) {
        clientAux = {...clientAux, endereco: client.address};
      }
      if (client?.cep) {
        clientAux = {...clientAux, cep: client.cep};
      }
      if (client?.telephone) {
        clientAux = {...clientAux, telefone_contato: client.telephone};
      }
      if (client?.birthDate) {
        clientAux = {...clientAux, data_nascimento: client.birthDate};
      }
      if (client?.genre) {
        clientAux = {...clientAux, genero: client.genre};
      }

      await api.patch<{message: string}>(
        `cliente/update/${clientId}`,
        clientAux,
      );
    },
  );

  async function patchUser({
    client,
    clientId,
    callback,
  }: {
    client: UserClient;
    clientId: number;
    callback?: () => void;
  }) {
    await mutation.mutateAsync({client, clientId}).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  return {
    patchUser,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

const useGetFeaturedProducts = (): {
  response: FeaturedProduct[] | undefined | null;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const query = useQuery([QueryConstants.FEATURED_PRODUCTS_LIST], async () => {
    const data = await api.get<{data: FeaturedProductResponse[]}>('produtos/');

    return data;
  });

  return {
    response: query?.data?.data?.data?.map((item: FeaturedProductResponse) => {
      return {
        id: item?.id,
        name: item?.nome,
        img: `${baseURL}/${item?.image}`,
        price: String(item?.price),
        promotion: item?.cupom,
        store: item?.loja,
        qrCodeImg: `${baseURL}/${item?.qr_code}`,
        category: item?.categoria,
        description: item?.description,
        isAvailable: item?.is_available,
      };
    }),
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isRefetching: query.isRefetching,
    isError: query.isError,
  };
};

const useGetMyDiscounts = (): {
  response: MyDiscountProduct[] | undefined | null;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const query = useQuery([QueryConstants.MY_DISCOUNTS_LIST], async () => {
    const data = await api.get<{data: MyDiscountProductResponse[]}>(
      'produto-cupom-cliente/',
    );

    return data;
  });

  return {
    response: query?.data?.data?.data?.map(
      (item: MyDiscountProductResponse) => {
        return {
          id: item?.id,
          name: item?.produto,
          img: `${baseURL}/${item?.image}`,
          price: String(item?.price),
          promotion: item?.desconto,
          store: item?.loja,
          qrCodeImg: `${baseURL}/${item?.qr_code}`,
          category: item?.categoria,
          description: item?.description,
          expiratedCupomCliente: item?.expirated_cupom_cliente,
          isBought: item?.comprado,
          isCupomValid: item?.cupom_valid,
        };
      },
    ),
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isRefetching: query.isRefetching,
    isError: query.isError,
  };
};

const useGetFeaturedProductDetail = (): {
  getFeaturedProductDetail: (
    productId: number,
    callback?: () => void,
  ) => Promise<void>;
  response: ProductDetail | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const [productId, setProductId] = useState<number | undefined>(undefined);

  const query = useQuery(
    [QueryConstants.FEATURED_PRODUCT_DETAIL, productId],
    async () => {
      if (productId) {
        const data = await api.get<FeaturedProductResponse>(
          `produtos/${productId}/`,
        );

        return {
          id: data?.data?.id,
          name: data?.data?.nome,
          img: `${baseURL}/${data?.data?.image}`,
          price: String(data?.data?.price),
          promotion: String(data?.data?.cupom),
          cupom: data?.data?.cupom,
          store: data?.data?.loja,
          qrCodeImg: `${baseURL}/${data?.data?.qr_code}`,
          description: data?.data?.description,
        };
      }

      return undefined;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!productId,
      retry: false,
    },
  );

  async function simulateAsyncRequest(
    productId: number,
    callback?: () => void,
  ): Promise<void> {
    return new Promise(resolve => {
      if (productId) {
        resolve(setProductId(productId));
      }
    })
      .then(() => {
        query.refetch().then(() => {
          callback && callback();
        });
      })
      .finally(() => {
        query.remove();
      });
  }

  return {
    response: query?.data,
    getFeaturedProductDetail: simulateAsyncRequest,
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isRefetching,
    isRefetching: query.isRefetching,
    isError: query.isError,
  };
};

const useGetMyDiscountProductDetail = (): {
  getMyDiscountProductDetail: (
    productId: number,
    callback?: () => void,
  ) => Promise<void>;
  response: ProductDetail | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const [productId, setProductId] = useState<number | undefined>(undefined);

  const query = useQuery(
    [QueryConstants.MY_DISCOUNT_PRODUCT_DETAIL, productId],
    async () => {
      if (productId) {
        const data = await api.get<MyDiscountProductResponse>(
          `produto-cupom-cliente/${productId}/`,
        );

        return {
          id: data?.data?.id,
          name: data?.data?.produto,
          img: `${baseURL}/${data?.data?.image}`,
          price: String(data?.data?.price),
          promotion: data?.data?.desconto,
          store: data?.data?.loja,
          description: data?.data?.description,
          cupom: data?.data?.desconto,
          qrCodeImg: `${baseURL}/${data?.data?.qr_code}`,
          category: data?.data?.categoria,
          whatsApp: data?.data?.whatsapp,
          expiratedCupomCliente: data?.data?.expirated_cupom_cliente,
          isBought: data?.data?.comprado,
          isCupomValid: data?.data?.cupom_valid,
        };
      }

      return undefined;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!productId,
      retry: false,
    },
  );

  async function simulateAsyncRequest(
    productId: number,
    callback?: () => void,
  ): Promise<void> {
    return new Promise(resolve => {
      if (productId) {
        resolve(setProductId(productId));
      }
    })
      .then(() => {
        query.refetch().then(() => {
          callback && callback();
        });
      })
      .finally(() => {
        query.remove();
      });
  }

  return {
    response: query?.data,
    getMyDiscountProductDetail: simulateAsyncRequest,
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isRefetching,
    isRefetching: query.isRefetching,
    isError: query.isError,
  };
};

const usePostGuaranteeDiscount = (): {
  postGuaranteeDiscount: ({
    productId,
    cupom,
    callback,
  }: {
    productId: number;
    cupom: number | string;
    callback?: () => void;
  }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const mutation = useMutation(
    async ({productId, cupom}: {productId: number; cupom: number | string}) => {
      await api.post('produto-cupom-cliente/', {
        produto: productId,
        cupom: cupom,
      });
    },
    {
      onSettled: () => {
        queryClient.refetchQueries([QueryConstants.MY_DISCOUNTS_LIST]);
        queryClient.refetchQueries([QueryConstants.FEATURED_PRODUCTS_LIST]);
      },
    },
  );

  async function postGuaranteeDiscount({
    productId,
    cupom,
    callback,
  }: {
    productId: number;
    cupom: number | string;
    callback?: () => void;
  }) {
    await mutation.mutateAsync({productId, cupom}).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  return {
    postGuaranteeDiscount,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

const usePostScanQrCode = (): {
  postScanQrCode: ({
    productId,
    cupomId,
  }: {
    productId: number;
    cupomId: number;
  }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const mutation = useMutation(
    async ({productId, cupomId}: {productId: number; cupomId: number}) => {
      await api.post<ScanQrCodeResponse>('purchase/produto-cupom-cliente', {
        produto: productId,
        cupom: cupomId,
      });
    },
  );

  async function postScanQrCode({
    productId,
    cupomId,
    callback,
  }: {
    productId: number;
    cupomId: number;
    callback?: () => void;
  }) {
    await mutation.mutateAsync({productId, cupomId}).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  return {
    postScanQrCode,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

const ServiceClient = {
  usePostSignUpClient,
  useGetUser,
  usePatchUser,
  useGetFeaturedProducts,
  useGetMyDiscountProductDetail,
  useGetMyDiscounts,
  useGetFeaturedProductDetail,
  usePostGuaranteeDiscount,
  usePostScanQrCode,
};

export default ServiceClient;
