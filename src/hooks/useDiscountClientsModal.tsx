import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import DiscountClientsModal from '../components/DiscountClientsModal';

import ProductDetailModal, { ProductDetailModalHandlersToFather } from '../components/ProductDetailModal';

type Product = {
  id: string;
  name: string;
  img: string;
  price: string;
  installment: string;
  promotion: string;
  soldBy: string;
  qrCodeImg: string;
}

type ProductDetailContextData = {
    showDiscountClientModal(): void;
    closeProductDetailModal(): void;
};

const discountClientsList = [
  {
    id: '0',
    name: 'MARIA APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '1',
    name: 'MARIA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '2',
    name: 'MARIA APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '3',
    name: 'MARIA APARECIDA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '4',
    name: 'APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '5',
    name: 'MARIA APARECIDA SILVA CAROLINA CAROLA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '6',
    name: 'MARIA APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '7',
    name: 'MARIA APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '8',
    name: 'MARIA APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '9',
    name: 'MARIA APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '10',
    name: 'MARIA APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '11',
    name: 'MARIA APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
  {
    id: '12',
    name: 'MARIA APARECIDA SILVA',
    product: 'Produto Monitor para PC Full HD UltraWide LG LED IPS 29” - 29WK600',
    telephone: '(71) 98339-3679',
    email: 'mariaap@hotmail.com',
    address: 'Endereço Rua Padre Filgues, Pituba - Salvador-BA'
  },
]

const ProductDetailModalContext = createContext<ProductDetailContextData>({} as ProductDetailContextData);

type ProductDetailModalProviderProps = {
    children: ReactNode;
}

const DiscountClientsModalProvider: React.FC<ProductDetailModalProviderProps> = ({ children }) => {
  const productDetailModalRef = useRef<ProductDetailModalHandlersToFather>(null);

  const showDiscountClientModal = useCallback(() => {
    productDetailModalRef.current?.openModal();
    }, [productDetailModalRef]);

  const closeProductDetailModal = useCallback(() => {
    productDetailModalRef.current?.closeModal();
  }, [productDetailModalRef]);

  const renderProductDetailModal = useCallback(() => {
    return (
      <DiscountClientsModal
        ref={productDetailModalRef}
        discountClients={discountClientsList}
        onClose={closeProductDetailModal}
      />
    );
  }, [productDetailModalRef, discountClientsList, closeProductDetailModal]);

  return (
    <ProductDetailModalContext.Provider
      value={{
        showDiscountClientModal,
        closeProductDetailModal,
      }}
    >
      {children}
      {renderProductDetailModal()}
    </ProductDetailModalContext.Provider>
  );
};

function useDiscountClientsModal(): ProductDetailContextData {
    const showDiscountClientModal = useContextSelector(ProductDetailModalContext, (productDetailContext: ProductDetailContextData) => productDetailContext.showDiscountClientModal);
  const closeProductDetailModal = useContextSelector(ProductDetailModalContext, (productDetailContext: ProductDetailContextData) => productDetailContext.closeProductDetailModal);

  return {
    showDiscountClientModal,
    closeProductDetailModal
  };
}

export { DiscountClientsModalProvider, useDiscountClientsModal };
