import {useQuery} from '@tanstack/react-query';
import {useState} from 'react';
import api from '../api';
import {
  Product,
  ProductDetail,
  ProductDetailResponse,
  ProductResponse,
  ScanQrCodeResponse,
  SiginUp,
  SignUpResponse,
  UserClientRequest,
} from './types';

const usePostSignUp = () => {
  const [data, setData] = useState<SignUpResponse | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const postSignUp = async (client: SiginUp) => {
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
    postSignUp,
    isSuccess: !!data?.token,
    isLoading,
    isError,
  };
};

const usePatchUser = () => {
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const patchUser = async (client: UserClientRequest, clientId: number) => {
    setIsLosding(true);
    try {
      const response = await api.patch<{message: string}>(
        `cliente/update/${clientId}`,
        client,
      );
      setData(response.data);
    } catch (err) {
      setIsError(!!err);
    } finally {
      setIsLosding(false);
    }
  };

  return {
    patchUser,
    isSuccess: data,
    isLoading,
    isError,
  };
};

const useGetFeaturedProducts = (): {
  response: Product[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
} => {
  const query = useQuery(['FEATURED-PRODUCTS-LIST'], async () => {
    const data = await api.get<ProductResponse[]>('produtos/');

    return data;
  });

  return {
    response: query?.data?.data?.map((item: ProductResponse) => {
      return {
        id: item.id,
        name: item.nome,
        // img: `http://10.0.2.2:8000/${item.image}`,
        img: '',
        price: item.price,
        installment: 'verificar de/para',
        promotion: `${item.cupom_id}%OFF`,
        soldBy: `loja ${item.loja_id}`,
        // qrCodeImg: `http://10.0.2.2:8000/${item.qr_code}`,
        qrCodeImg: '',
      };
    }),
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};

const useGetMyDiscounts = (): {
  response: ProductResponse[] | undefined | null;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
} => {
  const query = useQuery(['GET-MY-DISCOUNTS-LIST'], async () => {
    const data = await api.get('produto-cupom-cliente/');

    return data;
  });

  return {
    response: query?.data?.data?.map((item: ProductResponse) => {
      return {
        id: item.id,
        name: 'teste',
        img: '',
        price: 10,
        installment: 'verificar de/para',
        promotion: 'verificar de/para',
        soldBy: 'verificar de/para',
        qrCodeImg: '',
      };
    }),
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

const usePostGuaranteeDiscount = () => {
  const [data, setData] = useState<any>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const postGuaranteeDiscount = async (product: number, cupom: number) => {
    setIsLosding(true);
    try {
      const response = await api.post('produto-cupom-cliente/', {
        produto: product,
        cupom,
      });
      setData(response.data);
    } catch (err) {
      setIsError(!!err);
    } finally {
      setIsLosding(false);
    }
  };

  return {
    postGuaranteeDiscount,
    isSuccess: !!data,
    isLoading,
    isError,
  };
};

const usePostScanQrCode = () => {
  const [data, setData] = useState<ScanQrCodeResponse | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const postScanQrCode = async (product: number, cupom: number) => {
    setIsLosding(true);
    try {
      const response = await api.post<ScanQrCodeResponse>(
        'purchase/produto-cupom-cliente',
        {
          produto: product,
          cupom,
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
    postScanQrCode,
    isSuccess: !!data,
    isLoading,
    isError,
  };
};

const ServiceClient = {
  usePostSignUp,
  usePatchUser,
  useGetFeaturedProducts,
  useGetMyDiscounts,
  useGetProductDetail,
  usePostGuaranteeDiscount,
  usePostScanQrCode,
};

export default ServiceClient;
