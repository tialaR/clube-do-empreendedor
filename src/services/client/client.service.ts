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

const useGetFeaturedProducts = () => {
  const [data, setData] = useState<Product[] | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const getFeaturedProducts = async () => {
    setIsLosding(true);
    try {
      const response = await api.get<ProductResponse[]>('produtos/');
      setData(
        response.data?.map((item: ProductResponse) => {
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
      );
    } catch (err) {
      setIsError(!!err);
    } finally {
      setIsLosding(false);
    }
  };

  return {
    getFeaturedProducts,
    data,
    isLoading,
    isError,
  };
};

const useGetMyDiscounts = () => {
  const [data, setData] = useState<Product[] | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const getMyDiscounts = async () => {
    setIsLosding(true);
    try {
      const response = await api.get<ProductResponse[]>(
        'produto-cupom-cliente/',
      );
      setData(
        response.data?.map((item: ProductResponse) => {
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
      );
    } catch (err) {
      setIsError(!!err);
    } finally {
      setIsLosding(false);
    }
  };

  return {
    getMyDiscounts,
    data,
    isLoading,
    isError,
  };
};

const useGetProductDetail = () => {
  const [data, setData] = useState<ProductDetail | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const getProductDetail = async (productId: number) => {
    setIsLosding(true);
    try {
      const response = await api.get<ProductDetailResponse>(
        `produtos/${productId}/`,
      );
      setData({
        id: response?.data?.id,
        name: response?.data?.nome,
        // img: response?.data?.image,
        img: '',
        price: `R$ ${response?.data?.price}`,
        installment: 'campo indefinido',
        promotion: String(response?.data?.cupom),
        cupomId: response?.data?.cupom,
        soldBy: String(response?.data?.loja),
        qrCodeImg: '',
        description: response?.data?.description,
      });
    } catch (err) {
      setIsError(!!err);
    } finally {
      setIsLosding(false);
    }
  };

  return {
    getProductDetail,
    data,
    isLoading,
    isError,
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
