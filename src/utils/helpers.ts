export const isValidName = /^[\w.@+-]+$/;
export const isValidCPF = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
export const isValidCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
export const isValidUserName = /^[\w.@+-]+$/;
export const isValidDate =
  /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/;
export const isValidPhone = /(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g; // FIX-ME - To validate (00) 0000-0000
export const isValidCEP =
  /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/;

// 000.000.000-00
export function maskCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
}

// 00.000.000/0000-000
export function maskCNPJ(cnpj: string) {
  cnpj = cnpj.replace(/\D/g, '');
  cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
  cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
  cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
  return cnpj;
}

// 00/00/0000
export function maskDate(date: string) {
  date = date.replace(/\D/g, '');
  date = date.replace(/(\d{2})(\d)/, '$1/$2');
  date = date.replace(/(\d{2})(\d)/, '$1/$2');
  date = date.replace(/(\d{2})(\d{2})$/, '$1$2');
  date = date.slice(0, 10);
  return date;
}

// (00) 00000-0000
// (00) 0000-0000
export function maskPhone(phone: string) {
  return phone
    .replace(/\D/g, '')
    .replace(/(^\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4}$)/, '$1-$2');
}

// 00.000-000
export function maskCEP(cep: string) {
  return cep
    .replace(/\D/g, '')
    .replace(
      /^([\d]{2})([\d]{3})([\d]{3})|^[\d]{2}.[\d]{3}-[\d]{3}/,
      '$1.$2-$3',
    );
}

export function removeMaskToNumbers(value: string) {
  return value?.replace(/[^0-9]+/g, '');
}

export function formatDateToSendToApi(value: string) {
  if (value) {
    const [day, month, year] = value?.split('/');
    const result = [year, month, day]?.join('-');

    return result;
  }

  return '';
}

export function formatCurrencyBRL(value: number | string | null | undefined) {
  if (value) {
    const formatedValue = String(value)?.replace('.', ',');

    return `R$ ${formatedValue}`;
  }

  return '-';
}
