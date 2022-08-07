import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';

import {baseURL} from '../../utils/constants';
import {formatCurrencyBRL} from '../../utils/helpers';
import api from '../api';
import {
  FeaturedProduct,
  FeaturedProductResponse,
  MyDiscountProduct,
  MyDiscountProductResponse,
  ProductDetail,
  ProductDetailResponse,
  ScanQrCodeResponse,
  SiginUp,
  SignUpResponse,
  UserClientRequest,
} from './types';

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

const usePatchUser = (): {
  patchUser: ({
    client,
    clientId,
  }: {
    client: UserClientRequest;
    clientId: number;
  }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const mutation = useMutation(
    async ({
      client,
      clientId,
    }: {
      client: UserClientRequest;
      clientId: number;
    }) => {
      await api.patch<{message: string}>(`cliente/update/${clientId}`, client);
    },
  );

  async function patchUser({
    client,
    clientId,
    callback,
  }: {
    client: UserClientRequest;
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
  isError: boolean;
} => {
  const query = useQuery(['FEATURED-PRODUCTS-LIST'], async () => {
    const data = await api.get<{data: FeaturedProductResponse[]}>('produtos/');

    return data;
  });

  return {
    response: query?.data?.data?.data?.map((item: FeaturedProductResponse) => {
      return {
        id: item?.id,
        name: item?.nome,
        img: `${baseURL}/${item?.image}`,
        price: formatCurrencyBRL(item?.price),
        promotion: item?.cupom,
        soldBy: item?.loja,
        qrCodeImg: `${baseURL}/${item?.qr_code}`,
        category: item?.categoria,
        description: item?.description,
        isAvailable: item?.is_available,
      };
    }),
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};

const useGetMyDiscounts = (): {
  response: MyDiscountProduct[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
} => {
  const query = useQuery(['GET-MY-DISCOUNTS-LIST'], async () => {
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
          price: formatCurrencyBRL(item?.price),
          promotion: item?.desconto,
          soldBy: item?.loja,
          qrCodeImg: `${baseURL}/${item?.qr_code}`,
          category: item?.categoria,
          expiratedCupomCliente: item?.expirated_cupom_cliente,
          isBought: item?.comprado,
          isCupomValid: item?.cupom_valid,
        };
      },
    ),
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};

const useGetProductDetail = (): {
  getProductDetail: (productId: number, callback?: () => void) => Promise<void>;
  response: ProductDetail | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const [productId, setProductId] = useState<number | undefined>(undefined);

  const query = useQuery(
    ['PRODUCT-DETAIL', productId],
    async () => {
      if (productId) {
        const data = await api.get<ProductDetailResponse>(
          `produtos/${productId}/`,
        );

        return data;
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
    // response: query.data?.data?.data,
    response: {
      id: query.data?.data?.id,
      name: query.data?.data?.nome,
      // img: query.data?.data?.image,
      img: '',
      price: `R$ ${query.data?.data?.price}`,
      installment: 'campo indefinido',
      promotion: String(query.data?.data?.cupom),
      cupomId: query.data?.data?.cupom,
      soldBy: String(query.data?.data?.loja),
      qrCodeImg: '',
      description: query.data?.data?.description,
    },
    getProductDetail: simulateAsyncRequest,
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
      await api.post('produto-cupom-cliente/', {
        produto: productId,
        cupom: cupomId,
      });
    },
  );

  async function postGuaranteeDiscount({
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
  usePatchUser,
  useGetFeaturedProducts,
  useGetMyDiscounts,
  useGetProductDetail,
  usePostGuaranteeDiscount,
  usePostScanQrCode,
};

export default ServiceClient;
