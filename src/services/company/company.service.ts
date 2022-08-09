import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';

import {baseURL} from '../../utils/constants';
import {formatCurrencyBRL} from '../../utils/helpers';

import api from '../api';
import QueryConstants from '../queryConstants';

import {
  CompanyInformations,
  CompanyInformationsResponse,
  ProductDetail,
  ProductDetailResponse,
  RegisteredProductResponse,
  RegisterCupomRequest,
  SiginUp,
  SignUpResponse,
  UserCompanyRequest,
  RegisteredProduct,
  DiscountClient,
  DiscountClientResponse,
  UserCompanyResponse,
  UserCompany,
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

const useGetCompany = ({
  companyId,
}: {
  companyId: number;
}): {
  response: UserCompany | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const query = useQuery([QueryConstants.USER_DETAIL, companyId], async () => {
    if (companyId) {
      const data = await api.get<UserCompanyResponse>(`lojas/${companyId}/`);

      return {
        fantasyName: data?.data?.nome_fantasia,
        cnpj: data?.data?.cnpj,
        address: data?.data?.endereco,
        cep: data?.data?.cep,
        openingTime: data?.data?.horario_abertura,
        closingTime: data?.data?.horario_fechamento,
        companyDescription: data?.data?.descricao_empresa,
        email: null,
        occupationArea: data?.data?.area_atuacao,
        telephone: data?.data?.telefone_contato,
        whatsApp: data?.data?.whatsapp,
        instagram: data?.data?.instagram,
        facebook: data?.data?.facebook,
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

const usePatchCompany = (): {
  patchCompany: ({
    company,
    companyId,
  }: {
    company: UserCompany;
    companyId: number;
  }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const mutation = useMutation(
    async ({company, companyId}: {company: UserCompany; companyId: number}) => {
      let companyAux: UserCompanyRequest = {
        user: Number(companyId),
      };

      if (company?.cnpj) {
        companyAux = {...companyAux, cnpj: company?.cnpj};
      }
      if (company?.fantasyName) {
        companyAux = {...companyAux, nome_fantasia: company.fantasyName};
      }
      if (company?.facebook) {
        companyAux = {...companyAux, facebook: company.facebook};
      }
      if (company?.instagram) {
        companyAux = {...companyAux, instagram: company.instagram};
      }
      if (company?.whatsApp) {
        companyAux = {...companyAux, whatsapp: company.whatsApp};
      }
      if (company?.address) {
        companyAux = {...companyAux, endereco: company.address};
      }
      if (company?.cep) {
        companyAux = {...companyAux, cep: company.cep};
      }
      if (company?.telephone) {
        companyAux = {...companyAux, telefone_contato: company.telephone};
      }
      if (company?.openingTime) {
        companyAux = {...companyAux, horario_abertura: company.openingTime};
      }
      if (company?.closingTime) {
        companyAux = {...companyAux, horario_fechamento: company.closingTime};
      }
      if (company?.companyDescription) {
        companyAux = {
          ...companyAux,
          descricao_empresa: company.companyDescription,
        };
      }
      if (company?.occupationArea) {
        companyAux = {...companyAux, area_atuacao: company.occupationArea};
      }

      console.log(JSON.stringify(companyAux));

      await api.patch<{message: string}>(
        `loja/update/${companyId}`,
        companyAux,
      );
    },
  );

  async function patchCompany({
    company,
    companyId,
    callback,
  }: {
    company: UserCompany;
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
  response: RegisteredProduct[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const query = useQuery([QueryConstants.REGISTER_PRODUCTS_LIST], async () => {
    const data = await api.get<{data: RegisteredProductResponse[]}>(
      'produtos/',
    );

    return data;
  });

  return {
    response: query?.data?.data?.data?.map(
      (item: RegisteredProductResponse) => {
        return {
          id: item?.id,
          name: item?.nome,
          img: `${baseURL}/${item?.image}`,
          price: formatCurrencyBRL(item?.price),
          promotion: item?.cupom,
          store: item?.loja,
          qrCodeImg: `${baseURL}/${item?.qr_code}`,
          category: item?.categoria,
          description: item?.description,
          isAvailable: item?.is_available,
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

const useGetRegisteredProductDetail = ({
  productId,
}: {
  productId: number;
}): {
  response: ProductDetail | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const query = useQuery(
    [QueryConstants.REGISTERED_PRODUCT_DETAIL, productId],
    async () => {
      if (productId) {
        const data = await api.get<ProductDetailResponse>(
          `produtos/${productId}/`,
        );

        console.log(JSON.stringify(data.data));

        return {
          id: data?.data?.id,
          name: data?.data?.nome,
          img: `${baseURL}/${data?.data?.image}`,
          price: formatCurrencyBRL(data?.data?.price),
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

  return {
    response: query?.data,
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

const useGetDiscountClients = (): {
  response: DiscountClient[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const query = useQuery([QueryConstants.DISCOUNT_CLIENTS_LIST], async () => {
    const data = await api.get<{data: DiscountClientResponse[]}>(
      'produto-cupom-cliente/',
    );

    return data;
  });

  return {
    response: query?.data?.data?.data?.map((item: DiscountClientResponse) => {
      return {
        id: item?.id,
        name: item?.cliente,
        product: item?.produto,
        bought: item?.comprado,
        address: item?.endereco,
        cpf: item?.cpf,
        email: item?.email,
        expiratedCupomCliente: item?.expirated_cupom_cliente,
        telephone: item?.telefone_contato,
        isCupomValid: item?.cupom_valid,
      };
    }),
    isSuccess: query.isSuccess,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isRefetching: query.isRefetching,
    isError: query.isError,
  };
};

const usePatchDiscountClientConfirmBuy = (): {
  patchDiscountClientConfirmBuy: ({
    discountClientId,
    isBought,
    callback,
  }: {
    discountClientId: number;
    isBought: boolean;
    callback?: () => void;
  }) => Promise<void>;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
} => {
  const mutation = useMutation(
    async ({
      discountClientId,
      isBought,
    }: {
      discountClientId: number;
      isBought: boolean;
    }) => {
      await api.patch<DiscountClientResponse>(
        `produto-cupom-cliente/${discountClientId}/`,
        {
          id: discountClientId,
          comprado: isBought,
        },
      );
    },
  );

  async function patchDiscountClientConfirmBuy({
    discountClientId,
    isBought,
    callback,
  }: {
    discountClientId: number;
    isBought: boolean;
    callback?: () => void;
  }) {
    await mutation.mutateAsync({discountClientId, isBought}).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  return {
    patchDiscountClientConfirmBuy,
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
  useGetCompany,
  usePatchCompany,
  useGetRegisteredProducts,
  useGetRegisteredProductDetail,
  usePostCupom,
  useGetDiscountClients,
  usePatchDiscountClientConfirmBuy,
  useGetCompanyLocation,
};

export default ServiceCompany;
