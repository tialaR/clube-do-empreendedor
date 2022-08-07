export type SiginUp = {
  username: string;
  email: string;
  password: string;
  cpf: string;
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

export type User = {
  username: string;
  email: string;
  isClient: boolean;
};

export type AuthState = {
  user: User;
  token: string;
};

export type UserClientRequest = {
  nome_completo?: string;
  cpf: string;
  endereco?: string;
  cep?: string;
  telefone_contato?: string;
  data_nascimento?: string;
  genero?: 'M' | 'F';
  user?: number;
};

export type FeaturedProductResponse = {
  id: number;
  nome: string;
  image: string;
  description: string;
  price: string;
  qr_code: string;
  is_available: boolean;
  loja: string;
  categoria: string;
  cupom: string;
};

export type FeaturedProduct = {
  id: number;
  name: string;
  img: string;
  price: string;
  promotion: string;
  soldBy: string;
  qrCodeImg: string;
  category: string;
  description: string;
  isAvailable: boolean;
};

export type MyDiscountProductResponse = {
  id: number | null;
  expirated_cupom_cliente: string | null;
  comprado: boolean | null;
  produto: string | null;
  cliente: string | null;
  cpf: string | null;
  telefone_contato: string | null;
  endereco: string | null;
  email: string | null;
  loja: string | null;
  categoria: string | null;
  desconto: string | null;
  price: number | string | null;
  image: string | null;
  qr_code: string | null;
  cupom_valid: boolean | null;
};

export type MyDiscountProduct = {
  id: number | null;
  name: string | null;
  img: string | null;
  price: string | null;
  promotion: string | null;
  soldBy: string | null;
  qrCodeImg: string | null;
  category: string | null;
  expiratedCupomCliente: string | null;
  isBought: boolean | null;
  isCupomValid: boolean | null;
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

export type ScanQrCodeResponse = {
  produto: number;
  cupom: number;
  cliente: number;
  expirated_cupom_cliente: string;
};
