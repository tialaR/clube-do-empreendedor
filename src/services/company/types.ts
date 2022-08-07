export type SiginUp = {
  username: string;
  email: string;
  password: string;
  cnpj: string;
  fantasyName: string;
};

export type SignUpResponse = {
  user: {
    username: string;
    email: string;
    is_cliente: boolean;
  };
  token: string;
  message: string;
};

export type UserCompanyRequest = {
  nome_fantasia?: string;
  cnpj: string;
  redes_sociais?: string;
  endereco?: string;
  cep?: string;
  telefone_contato?: string;
  horario_abertura?: string;
  horario_fechamento?: string;
  descricao_empresa?: string;
  area_atuacao?: string;
  user: number;
};

export type RegisterCupomRequest = {
  discount: string;
  storeId: number;
  callback?: () => void;
};

export type RegisterCupomResponse = {
  desconto: string;
  create_at: string;
  loja: number;
};

export type RegisteredProductResponse = {
  id: number | null | undefined;
  nome: string | null | undefined;
  image: string | null | undefined;
  description: string | null | undefined;
  price: string | number | null | undefined;
  qr_code: string | null | undefined;
  is_available: boolean | null | undefined;
  loja: string | null | undefined;
  categoria: string | null | undefined;
  cupom: string | null | undefined;
};

export type RegisteredProduct = {
  id: number | null | undefined;
  name: string | null | undefined;
  img: string | null | undefined;
  price: string | null | undefined;
  promotion: string | null | undefined;
  store: string | null | undefined;
  qrCodeImg: string | null | undefined;
  category: string | null | undefined;
  description: string | null | undefined;
  isAvailable: boolean | null | undefined;
};

export type ProductDetailResponse = {
  id: number;
  loja: number;
  categoria: number;
  nome: string;
  image: string;
  description: string;
  price: string;
  cupom: number;
  is_available: boolean;
};

export type ProductDetail = {
  id: number | undefined;
  name: string | undefined;
  img: string | undefined;
  price: string | undefined;
  installment: string | undefined;
  promotion: string | undefined;
  cupomId: number | undefined;
  soldBy: string | undefined;
  qrCodeImg: string | undefined;
  description: string | undefined;
};

export type CompanyInformationsResponse = {
  latitude: number;
  longitude: number;
  loja: string;
  facebook: string | null;
  instagram: string | null;
  whatsapp: string | null;
};

export type CompanyInformations = {
  latitude: number;
  longitude: number;
  store: string;
  facebook: string | null;
  instagram: string | null;
  whatsapp: string | null;
};
