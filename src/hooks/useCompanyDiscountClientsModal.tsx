import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import DiscountClientsModal, { DiscountClientsModalHandlersToFather } from '../components/CompanyDiscountClientsModal';

type DiscountClientsModalContextData = {
    showDiscountClientModal(): void;
    closeDiscountClientModal(): void;
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

const DiscountClientsModalContext = createContext<DiscountClientsModalContextData>({} as DiscountClientsModalContextData);

type DiscountClientsModalProviderProps = {
    children: ReactNode;
}

const CompanyDiscountClientsModalProvider: React.FC<DiscountClientsModalProviderProps> = ({ children }) => {
  const discountClientsModalRef = useRef<DiscountClientsModalHandlersToFather>(null);

  const showDiscountClientModal = useCallback(() => {
    discountClientsModalRef.current?.openModal();
    }, [discountClientsModalRef]);

  const closeDiscountClientModal = useCallback(() => {
    discountClientsModalRef.current?.closeModal();
  }, [discountClientsModalRef]);

  const renderDiscountClientModal = useCallback(() => {
    return (
      <DiscountClientsModal
        ref={discountClientsModalRef}
        discountClients={discountClientsList}
        onClose={closeDiscountClientModal}
      />
    );
  }, [discountClientsModalRef, discountClientsList, closeDiscountClientModal]);

  return (
    <DiscountClientsModalContext.Provider
      value={{
        showDiscountClientModal,
        closeDiscountClientModal,
      }}
    >
      {children}
      {renderDiscountClientModal()}
    </DiscountClientsModalContext.Provider>
  );
};

function useCompanyDiscountClientsModal(): DiscountClientsModalContextData {
    const showDiscountClientModal = useContextSelector(DiscountClientsModalContext, (discountClientsModalContext: DiscountClientsModalContextData) => discountClientsModalContext.showDiscountClientModal);
    const closeDiscountClientModal = useContextSelector(DiscountClientsModalContext, (discountClientsModalContext: DiscountClientsModalContextData) => discountClientsModalContext.closeDiscountClientModal);

    return {
      showDiscountClientModal,
      closeDiscountClientModal
    };
}

export { CompanyDiscountClientsModalProvider, useCompanyDiscountClientsModal };
