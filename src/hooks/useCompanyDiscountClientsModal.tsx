import React, {ReactNode, useCallback, useRef} from 'react';
import {createContext, useContextSelector} from 'use-context-selector';

import DiscountClientsModal, {
  DiscountClientsModalHandlersToFather,
} from '../components/CompanyDiscountClientsModal';

type DiscountClientsModalContextData = {
  showDiscountClientModal(): void;
  closeDiscountClientModal(): void;
};

const DiscountClientsModalContext =
  createContext<DiscountClientsModalContextData>(
    {} as DiscountClientsModalContextData,
  );

type DiscountClientsModalProviderProps = {
  children: ReactNode;
};

const CompanyDiscountClientsModalProvider: React.FC<
  DiscountClientsModalProviderProps
> = ({children}) => {
  const discountClientsModalRef =
    useRef<DiscountClientsModalHandlersToFather>(null);

  const showDiscountClientModal = useCallback(() => {
    discountClientsModalRef.current?.openModal();
  }, [discountClientsModalRef]);

  const closeDiscountClientModal = useCallback(() => {
    discountClientsModalRef.current?.closeModal();
  }, [discountClientsModalRef]);

  return (
    <DiscountClientsModalContext.Provider
      value={{
        showDiscountClientModal,
        closeDiscountClientModal,
      }}>
      {children}
      <DiscountClientsModal
        ref={discountClientsModalRef}
        onClose={closeDiscountClientModal}
      />
    </DiscountClientsModalContext.Provider>
  );
};

function useCompanyDiscountClientsModal(): DiscountClientsModalContextData {
  const showDiscountClientModal = useContextSelector(
    DiscountClientsModalContext,
    (discountClientsModalContext: DiscountClientsModalContextData) =>
      discountClientsModalContext.showDiscountClientModal,
  );
  const closeDiscountClientModal = useContextSelector(
    DiscountClientsModalContext,
    (discountClientsModalContext: DiscountClientsModalContextData) =>
      discountClientsModalContext.closeDiscountClientModal,
  );

  return {
    showDiscountClientModal,
    closeDiscountClientModal,
  };
}

export {CompanyDiscountClientsModalProvider, useCompanyDiscountClientsModal};
