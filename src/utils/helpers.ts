export const isValidCPF = /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}))$/;
export const isValidCNPJ = /^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/; //TODO - FIX-ME
export const isValidDate = /(\d{4})[-.\/](\d{2})[-.\/](\d{2})/; //TODO - FIX-ME

// 000.000.000-00
export function maskCPF(cpf: string) {
    cpf=cpf.replace(/\D/g,"");
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2");
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
    return cpf;
}

export function maskCNPJ(cnpj: string) {
    return cnpj
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, "$1 $2 $3/$4-$5");
}

// 00/00/0000
export function maskDate(date: string) {
    date = date.replace(/\D/g, "");
    date = date.replace(/(\d{2})(\d)/, "$1/$2");
    date = date.replace(/(\d{2})(\d)/, "$1/$2");
    date = date.replace(/(\d{2})(\d{2})$/, "$1$2");
    date = date.slice(0, 10)
    return date;
}

// (00) 00000-0000
// (00) 0000-0000
//TODO - FIX-ME
export function maskPhone(phone: string) {
    return phone
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})(\d)/, "$1-$2");
}

// 00000-000
export function maskCEP(cep: string) {
    return cep.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
};