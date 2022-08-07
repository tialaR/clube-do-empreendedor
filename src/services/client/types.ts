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

export type UserClient = {
  id?: number | null | undefined;
  name?: string | null | undefined;
  cpf: string | null | undefined;
  birthDate?: string | null | undefined;
  address?: string | null | undefined;
  cep?: string | null | undefined;
  genre?: 'M' | 'F' | null | undefined;
  email?: string | null | undefined;
  telephone?: string | null | undefined;
  user: number | null | undefined;
};

export type UserClientResponse = {
  id: number | null | undefined;
  nome_completo: string | null | undefined;
  cpf: string | null | undefined;
  endereco: string | null | undefined;
  cep: string | null | undefined;
  telefone_contato: string | null | undefined;
  data_nascimento: string | null | undefined;
  genero: 'M' | 'F' | null | undefined;
  user: number | null | undefined;
};

export type UserClientRequest = {
  nome_completo?: string;
  cpf: string;
  endereco?: string;
  cep?: string;
  telefone_contato?: string;
  data_nascimento?: string;
  genero?: 'M' | 'F';
  user: number;
};

export type FeaturedProductResponse = {
  id: number | null | undefined;
  nome: string | null | undefined;
  image: string | null | undefined;
  description: string | null | undefined;
  price: string | null | undefined;
  qr_code: string | null | undefined;
  is_available: boolean | null | undefined;
  loja: string | null | undefined;
  categoria: string | null | undefined;
  cupom: string | null | undefined;
};

export type FeaturedProduct = {
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

export type MyDiscountProductResponse = {
  id: number | null | undefined;
  expirated_cupom_cliente: string | null | undefined;
  comprado: boolean | null | undefined;
  produto: string | null | undefined;
  cliente: string | null | undefined;
  cpf: string | null | undefined;
  telefone_contato: string | null | undefined;
  endereco: string | null | undefined;
  email: string | null | undefined;
  loja: string | null | undefined;
  categoria: string | null | undefined;
  desconto: string | null | undefined;
  price: number | string | null | undefined;
  image: string | null | undefined;
  qr_code: string | null | undefined;
  cupom_valid: boolean | null | undefined;
};

export type MyDiscountProduct = {
  id: number | null | undefined;
  name: string | null | undefined;
  img: string | null | undefined;
  price: string | null | undefined;
  promotion: string | null | undefined;
  store: string | null | undefined;
  qrCodeImg: string | null | undefined;
  category: string | null | undefined;
  expiratedCupomCliente: string | null | undefined;
  isBought: boolean | null | undefined;
  isCupomValid: boolean | null | undefined;
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
};

export type ScanQrCodeResponse = {
  produto: number;
  cupom: number;
  cliente: number;
  expirated_cupom_cliente: string;
};
