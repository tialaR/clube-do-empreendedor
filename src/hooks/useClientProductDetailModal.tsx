import React, {ReactNode, useCallback, useRef, useState} from 'react';
import {createContext, useContextSelector} from 'use-context-selector';

import ClientProductDetailModal, {
  ClientProductDetailModalHandlersToFather,
} from '../components/ClientProductDetailModal';

type ClientProductDetailContextData = {
  showClientProductDetailModal({
    productId,
    isEmphasisProduct,
  }: {
    productId: number | null;
    isEmphasisProduct?: boolean;
  }): void;
  closeClientProductDetailModal(): void;
};

const ClientProductDetailModalContext =
  createContext<ClientProductDetailContextData>(
    {} as ClientProductDetailContextData,
  );

type ClientProductDetailModalProviderProps = {
  children: ReactNode;
};

const ClientProductDetailModalProvider: React.FC<
  ClientProductDetailModalProviderProps
> = ({children}) => {
  const productDetailModalRef =
    useRef<ClientProductDetailModalHandlersToFather>(null);

  const [productId, setProductId] = useState<number | undefined>();
  const [isEmphasisProduct, setIsEmphasisProduct] = useState(false);

  const showClientProductDetailModal = useCallback(
    ({
      productId,
      isEmphasisProduct,
    }: {
      productId: number;
      isEmphasisProduct: boolean;
    }) => {
      productDetailModalRef.current?.openModal();

      setProductId(productId);
      setIsEmphasisProduct(isEmphasisProduct);
    },
    [productDetailModalRef],
  );

  const closeClientProductDetailModal = useCallback(() => {
    productDetailModalRef.current?.closeModal();
  }, [productDetailModalRef]);

  const renderClientProductDetailModal = useCallback(() => {
    return (
      <ClientProductDetailModal
        ref={productDetailModalRef}
        productId={productId}
        emphasisProduct={isEmphasisProduct}
        onClose={closeClientProductDetailModal}
      />
    );
  }, [
    productDetailModalRef,
    productId,
    isEmphasisProduct,
    closeClientProductDetailModal,
  ]);

  return (
    <ClientProductDetailModalContext.Provider
      value={{
        showClientProductDetailModal,
        closeClientProductDetailModal,
      }}>
      {children}
      {renderClientProductDetailModal()}
    </ClientProductDetailModalContext.Provider>
  );
};

function useClientProductDetailModal(): ClientProductDetailContextData {
  const showClientProductDetailModal = useContextSelector(
    ClientProductDetailModalContext,
    (clientProductDetailContext: ClientProductDetailContextData) =>
      clientProductDetailContext.showClientProductDetailModal,
  );
  const closeClientProductDetailModal = useContextSelector(
    ClientProductDetailModalContext,
    (clientProductDetailContext: ClientProductDetailContextData) =>
      clientProductDetailContext.closeClientProductDetailModal,
  );

  return {
    showClientProductDetailModal,
    closeClientProductDetailModal,
  };
}

export {ClientProductDetailModalProvider, useClientProductDetailModal};
