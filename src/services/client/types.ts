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

export type ProductResponse = {
  id: number;
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
