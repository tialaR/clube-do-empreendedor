export type SiginUp = {
  username: string;
  email: string;
  password: string;
  cnpj: string;
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

export type ProductResponse = {
  id: number;
  created: string;
  modified: string;
  loja_id: number;
  categoria_id: number;
  cupom_id: number;
  nome: string;
  image: string;
  description: string;
  price: number;
  qr_code: string;
  is_available: boolean;
};

export type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  installment: string;
  promotion: string;
  soldBy: string;
  qrCodeImg: string;
  isAvailable: boolean;
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
