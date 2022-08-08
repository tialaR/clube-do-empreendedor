import React, {ReactNode, useCallback, useMemo, useRef} from 'react';
import {createContext, useContextSelector} from 'use-context-selector';
import DiscountClientsModal, {
  DiscountClientsModalHandlersToFather,
} from '../components/CompanyDiscountClientsModal';
import ServiceCompany from '../services/company/company.service';

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

  const {
    response: discountClients,
    isLoading,
    isFetching,
    isRefetching,
  } = ServiceCompany.useGetDiscountClients();

  const generalLoading = useMemo(
    () => isLoading || isFetching || isRefetching,
    [isLoading, isFetching, isRefetching],
  );

  const showDiscountClientModal = useCallback(() => {
    discountClientsModalRef.current?.openModal();
  }, [discountClientsModalRef]);

  const closeDiscountClientModal = useCallback(() => {
    discountClientsModalRef.current?.closeModal();
  }, [discountClientsModalRef]);

  const renderDiscountClientModal = useCallback(() => {
    if (discountClients) {
      return (
        <DiscountClientsModal
          ref={discountClientsModalRef}
          isLoading={generalLoading}
          discountClients={discountClients}
          onClose={closeDiscountClientModal}
        />
      );
    }
  }, [
    discountClients,
    discountClientsModalRef,
    generalLoading,
    closeDiscountClientModal,
  ]);

  return (
    <DiscountClientsModalContext.Provider
      value={{
        showDiscountClientModal,
        closeDiscountClientModal,
      }}>
      {children}
      {renderDiscountClientModal()}
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
