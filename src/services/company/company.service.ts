import {useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {baseURL} from '../../utils/constants';

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
  RegisterProduct,
  CouponResponse,
  Coupon,
} from './types';

import queryClient from '../query';

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
          price: String(item?.price),
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

        return {
          id: data?.data?.id,
          name: data?.data?.nome,
          img: `${baseURL}/${data?.data?.image}`,
          price: String(data?.data?.price),
          promotion: String(data?.data?.cupom),
          promotionId: data?.data?.cupom_id,
          cupom: data?.data?.cupom,
          store: data?.data?.loja,
          qrCodeImg: `${baseURL}/${data?.data?.qr_code}`,
          description: data?.data?.description,
          isAvailable: data?.data?.is_available,
          category: data?.data?.categoria,
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

const useGetProduct = ({
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
    [QueryConstants.PRODUCT_DETAIL_INFORMATIONS, productId],
    async () => {
      if (productId) {
        const data = await api.get<RegisteredProductResponse>(
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
          isAvailable: data?.data?.is_available,
          category: data?.data?.categoria,
        };
      }

      return undefined;
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

const usePostProduct = () => {
  const [data, setData] = useState<RegisteredProduct | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState('');

  async function getToken(): Promise<void> {
    const [token] = await AsyncStorage.multiGet(['@EntrepreneursClub:token']);

    if (token[1]) {
      setToken(token[1]);
    }
  }

  getToken();

  const postProduct = ({product}: {product: RegisterProduct}) => {
    setIsLosding(true);

    const formData = new FormData();
    formData.append('nome', product?.name);
    formData.append('price', product?.price);
    formData.append('loja', product?.store);
    formData.append('categoria', product?.category);
    formData.append('image', {
      uri: product?.image?.uri,
      type: product?.image?.type,
      name: product?.image?.name,
    });
    formData.append('is_available', product?.availability);

    if (product?.description) {
      formData.append('description', product?.description);
    }
    if (product?.cupom) {
      formData.append('cupom', product?.cupom);
    }

    fetch(`${baseURL}produtos/`, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data; ',
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Algo deu errado!');
      })
      .then(responseJson => {
        let data = responseJson;
        console.log('-----------------------------------------');
        console.log('PRODUTO REGISTER ->>', data);
        console.log('-----------------------------------------');

        const dataAux: RegisteredProduct = {
          id: data?.id,
          name: data?.nome,
          img: `${baseURL}/${data?.image}`,
          price: data?.price,
          promotion: String(data?.cupom),
          store: data?.loja,
          qrCodeImg: `${baseURL}/${data?.qr_code}`,
          description: data?.description,
          category: data?.categoria,
          isAvailable: data?.is_available,
        };

        setData(dataAux);
        queryClient.refetchQueries([QueryConstants.REGISTER_PRODUCTS_LIST]);
      })
      .catch(err => {
        setIsError(!!err);
      })
      .finally(() => {
        setIsLosding(false);
      });
  };

  return {
    postProduct,
    response: data,
    isLoading,
    isError,
  };
};

const usePatchProduct = () => {
  const [data, setData] = useState<RegisteredProduct | undefined>(undefined);
  const [isLoading, setIsLosding] = useState(false);
  const [isError, setIsError] = useState(false);
  const [token, setToken] = useState('');

  async function getToken(): Promise<void> {
    const [token] = await AsyncStorage.multiGet(['@EntrepreneursClub:token']);

    if (token[1]) {
      setToken(token[1]);
    }
  }

  getToken();

  const patchProduct = ({
    product,
    productId,
  }: {
    product: RegisterProduct;
    productId: string;
  }) => {
    setIsLosding(true);

    const formData = new FormData();
    formData.append('nome', product?.name);
    formData.append('price', product?.price);
    formData.append('loja', product?.store);
    formData.append('categoria', product?.category);
    formData.append('image', {
      uri: product?.image?.uri,
      type: product?.image?.type,
      name: product?.image?.name,
    });
    formData.append('is_available', product?.availability);

    if (product?.description) {
      formData.append('description', product?.description);
    }
    if (product?.cupom) {
      formData.append('cupom', product?.cupom);
    }

    fetch(`${baseURL}produtos/${productId}/`, {
      method: 'patch',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data; ',
        Authorization: `Token ${token}`,
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Algo deu errado!');
      })
      .then(responseJson => {
        let data = responseJson;

        console.log('-----------------------------------------');
        console.log('PRODUTO UPDATE ->>', data);
        console.log('-----------------------------------------');

        const dataAux: RegisteredProduct = {
          id: data?.id,
          name: data?.nome,
          img: `${baseURL}/${data?.image}`,
          price: data?.price,
          promotion: String(data?.cupom),
          store: data?.loja,
          qrCodeImg: `${baseURL}/${data?.qr_code}`,
          description: data?.description,
          category: data?.categoria,
          isAvailable: data?.is_available,
        };

        setData(dataAux);
        queryClient.refetchQueries([QueryConstants.REGISTER_PRODUCTS_LIST]);
      })
      .catch(err => {
        setIsError(!!err);
      })
      .finally(() => {
        setIsLosding(false);
      });
  };

  return {
    patchProduct,
    response: data,
    isLoading,
    isError,
  };
};

const useGetCoupons = (): {
  response: Coupon[] | undefined;
  isSuccess: boolean;
  isLoading: boolean;
  isFetching: boolean;
  isRefetching: boolean;
  isError: boolean;
} => {
  const query = useQuery([QueryConstants.COUPONS_LIST], async () => {
    const data = await api.get<{data: CouponResponse[]}>('cupom/');

    console.log('---------------------------------------------');
    console.log('DESCONTOS -->', JSON.stringify(data?.data?.data));
    console.log('---------------------------------------------');

    return data.data.data.map(item => {
      return {
        id: item.id,
        discount: item.desconto,
        store: item.loja,
      };
    });
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
    {
      onSuccess: () => {
        queryClient.refetchQueries([QueryConstants.DISCOUNT_CLIENTS_LIST]);
      },
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
          address: data?.data?.endereco,
          description: data?.data?.descricao,
          openingTime: data?.data?.horario_abertura,
          closingTime: data?.data?.horario_fechamento,
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
  usePostProduct,
  usePatchProduct,
  useGetProduct,
  usePostCupom,
  useGetCoupons,
  useGetDiscountClients,
  usePatchDiscountClientConfirmBuy,
  useGetCompanyLocation,
};

export default ServiceCompany;
