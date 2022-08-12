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

export type UserCompany = {
  fantasyName: string | null | undefined;
  cnpj: string | null | undefined;
  address: string | null | undefined;
  cep: string | null | undefined;
  openingTime: string | null | undefined;
  closingTime: string | null | undefined;
  companyDescription: string | null | undefined;
  email: string | null | undefined;
  occupationArea: string | null | undefined;
  telephone: string | null | undefined;
  whatsApp: string | null | undefined;
  instagram: string | null | undefined;
  facebook: string | null | undefined;
};

export type UserCompanyResponse = {
  id: number | null | undefined;
  nome_fantasia: string | null | undefined;
  cnpj: string | null | undefined;
  facebook: string | null | undefined;
  instagram: string | null | undefined;
  whatsapp: string | null | undefined;
  endereco: string | null | undefined;
  cep: string | null | undefined;
  telefone_contato: string | null | undefined;
  horario_abertura: string | null | undefined;
  horario_fechamento: string | null | undefined;
  descricao_empresa: string | null | undefined;
  area_atuacao: string | null | undefined;
  user: number | null | undefined;
};

export type UserCompanyRequest = {
  nome_fantasia?: string;
  cnpj?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
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

type Photo = {
  uri: string | null | undefined;
  type: string | null | undefined;
  name: string | null | undefined;
};

export type RegisterProduct = {
  name: string | null | undefined;
  description: string | null | undefined;
  price: string | null | undefined;
  category: string | null | undefined;
  availability: boolean | null | undefined;
  cupom: string | null | undefined;
  image: Photo | undefined;
  store: string | null | undefined;
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

export type ProductDetail = {
  id: number | null | undefined;
  name: string | null | undefined;
  img: string | null | undefined;
  price: string | null | undefined;
  promotion: string | null | undefined;
  store: string | null | undefined;
  cupom: string | null | undefined;
  qrCodeImg: string | null | undefined;
  description: string | null | undefined;
  isAvailable: boolean | null | undefined;
  category: string | null | undefined;
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

export type DiscountClientResponse = {
  id: number | null | undefined;
  cliente: string | null | undefined;
  produto: string | null | undefined;
  comprado: boolean | null | undefined;
  cpf: string | null | undefined;
  email: string | null | undefined;
  endereco: string | null | undefined;
  telefone_contato: string | null | undefined;
  expirated_cupom_cliente: string | null | undefined;
  cupom_valid: boolean | null | undefined;
};

export type DiscountClient = {
  id: number | null | undefined;
  name: string | null | undefined;
  product: string | null | undefined;
  bought: boolean | null | undefined;
  cpf: string | null | undefined;
  email: string | null | undefined;
  address: string | null | undefined;
  telephone: string | null | undefined;
  expiratedCupomCliente: string | null | undefined;
  isCupomValid: boolean | null | undefined;
};

export type CouponResponse = {
  id: number | null | undefined;
  desconto: string | null | undefined;
  loja: string | null | undefined;
};

export type Coupon = {
  id: number | null | undefined;
  discount: string | null | undefined;
  store: string | null | undefined;
};
