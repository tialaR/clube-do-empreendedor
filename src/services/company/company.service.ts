import {useMutation, useQuery} from '@tanstack/react-query';
import {useState} from 'react';

import api from '../api';
import QueryConstants from '../queryConstants';

import {
  CompanyInformations,
  CompanyInformationsResponse,
  Product,
  ProductDetail,
  ProductDetailResponse,
  ProductResponse,
  RegisterCupomRequest,
  SiginUp,
  SignUpResponse,
  UserCompanyRequest,
} from './types';

const usePostSignUpCompany = () => {
  const [data, setData] = useState<SignUpResponse | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);

  const postSignUpCompany = async (clientStore: SiginUp) => {
    setIsLosding(true);
    try {
      const clientStoreAux = {
        username: clientStore?.username,
        nome_fantasia: clientStore?.fantasyName,
        email: clientStore?.email,
        password: clientStore?.password,
        cnpj: clientStore?.cnpj,
      };

      const response = await api.post<SignUpResponse>(
        'signup/loja',
        clientStoreAux,
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

const usePatchCompany = (): {
  patchCompany: ({
    company,
    companyId,
  }: {
    company: UserCompanyRequest;
    companyId: number;
  }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const mutation = useMutation(
    async ({
      company,
      companyId,
    }: {
      company: UserCompanyRequest;
      companyId: number;
    }) => {
      await api.patch<{message: string}>(`loja/update/${companyId}`, company);
    },
  );

  async function patchCompany({
    company,
    companyId,
    callback,
  }: {
    company: UserCompanyRequest;
    companyId: number;
    callback?: () => void;
  }) {
    await mutation.mutateAsync({company, companyId}).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  return {
    patchCompany,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
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

const useGetCompanyLocation = (): {
  getCompanyLocation: (
    companyFantasyName: string,
    callback?: () => void,
  ) => Promise<void>;
  response: CompanyInformations | undefined;
  isSuccess: boolean;
  isFetching: boolean;
  isError: boolean;
} => {
  const [companyFantasyName, setCompanyFantasyName] = useState<
    string | undefined
  >(undefined);

  const query = useQuery(
    [QueryConstants.COMPANY_LOCATION, companyFantasyName],
    async () => {
      if (companyFantasyName) {
        const data = await api.get<CompanyInformationsResponse>(
          'search/loja-endereco',
          {
            params: {
              nome_fantasia: companyFantasyName,
            },
          },
        );

        return {
          latitude: data?.data?.latitude,
          longitude: data?.data?.longitude,
          store: data?.data?.loja,
          facebook: data?.data?.facebook,
          instagram: data?.data?.instagram,
          whatsapp: data?.data?.whatsapp,
        };
      }

      return undefined;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!companyFantasyName,
      retry: false,
    },
  );

  async function simulateAsyncRequest(
    companyFantasyName: string,
    callback?: () => void,
  ): Promise<void> {
    return new Promise(resolve => {
      if (companyFantasyName) {
        resolve(setCompanyFantasyName(companyFantasyName));
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
    getCompanyLocation: simulateAsyncRequest,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
    isError: query.isError,
  };
};

const ServiceCompany = {
  usePostSignUpCompany,
  usePatchCompany,
  useGetRegisteredProducts,
  useGetRegisteredProductDetail,
  usePostCupom,
  useGetCompanyLocation,
};

export default ServiceCompany;
