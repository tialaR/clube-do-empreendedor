import {useMutation, useQuery} from '@tanstack/react-query';
import {useState} from 'react';

import api from '../api';

import {
  Product,
  ProductDetail,
  ProductDetailResponse,
  ProductResponse,
  RegisterCupomRequest,
  SiginUp,
  SignUpResponse,
} from './types';

const usePostSignUpCompany = () => {
  const [data, setData] = useState<SignUpResponse | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const postSignUpCompany = async (clientStore: SiginUp) => {
    setIsLosding(true);
    try {
      const response = await api.post<SignUpResponse>(
        'signup/loja',
        clientStore,
      );
      setData(response.data);
    } catch (err) {
      setIsError(!!err);
    } finally {
      setIsLosding(false);
    }
  };

  return {
    postSignUpCompany,
    isSuccess: !!data?.token,
    isLoading,
    isError,
  };
};

const useGetRegisteredProducts = (): {
  response: Product[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
} => {
  const query = useQuery(['REGISTER-PRODUCTS-LIST'], async () => {
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
        isAvailable: item.is_available,
      };
    }),
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};

const useGetRegisteredProductDetail = ({
  productId,
}: {
  productId: number;
}): {
  responseAux: any;
  response: ProductDetail | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const query = useQuery(
    ['REGISTERED-PRODUCT-DETAIL', productId],
    async () => {
      if (productId) {
        const data = await api.get<ProductDetailResponse>(
          `produtos/${productId}/`,
        );

        console.log(JSON.stringify(data.data));

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

  return {
    responseAux: query.data?.data,
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
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isRefetching,
    isRefetching: query.isRefetching,
    isError: query.isError,
  };
};

const usePostCupom = (): {
  postCupom: ({discount, storeId}: RegisterCupomRequest) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const mutation = useMutation(
    async ({discount, storeId}: RegisterCupomRequest) => {
      await api.post('cupom/', {
        desconto: discount,
        loja: storeId,
      });
    },
  );

  async function postCupom({
    discount,
    storeId,
    callback,
  }: RegisterCupomRequest) {
    await mutation.mutateAsync({discount, storeId}).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  return {
    postCupom,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
  };
};

const ServiceCompany = {
  usePostSignUpCompany,
  useGetRegisteredProducts,
  useGetRegisteredProductDetail,
  usePostCupom,
};

export default ServiceCompany;
