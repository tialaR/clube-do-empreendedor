import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

import ClientProductDetailModal, { ClientProductDetailModalHandlersToFather } from '../components/ClientProductDetailModal';

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

type ClientProductDetailContextData = {
    showClientProductDetailModal(
      { product, isEmphasisProduct }: { product: Product; isEmphasisProduct?: boolean }): void;
    closeClientProductDetailModal(): void;
};

const ClientProductDetailModalContext = createContext<ClientProductDetailContextData>({} as ClientProductDetailContextData);

type ClientProductDetailModalProviderProps = {
    children: ReactNode;
}

const ClientProductDetailModalProvider: React.FC<ClientProductDetailModalProviderProps> = ({ children }) => {
  const productDetailModalRef = useRef<ClientProductDetailModalHandlersToFather>(null);

  const [product, setProduct] = useState<Product | undefined>();
  const [isEmphasisProduct, setIsEmphasisProduct] = useState(false);

  const showClientProductDetailModal = useCallback((
    { product, isEmphasisProduct }: { product: Product, isEmphasisProduct: boolean }) => {
    productDetailModalRef.current?.openModal();

    setProduct(product);
    setIsEmphasisProduct(isEmphasisProduct)
    }, [productDetailModalRef]);

  const closeClientProductDetailModal = useCallback(() => {
    productDetailModalRef.current?.closeModal();
  }, [productDetailModalRef]);

  const renderClientProductDetailModal = useCallback(() => {
    return (
      <ClientProductDetailModal
        ref={productDetailModalRef}
        product={product}
        emphasisProduct={isEmphasisProduct}
        onClose={closeClientProductDetailModal}
      />
    );
  }, [productDetailModalRef, product, isEmphasisProduct, closeClientProductDetailModal]);

  return (
    <ClientProductDetailModalContext.Provider
      value={{
        showClientProductDetailModal,
        closeClientProductDetailModal,
      }}
    >
      {children}
      {renderClientProductDetailModal()}
    </ClientProductDetailModalContext.Provider>
  );
};

function useClientProductDetailModal(): ClientProductDetailContextData {
  const showClientProductDetailModal = useContextSelector(ClientProductDetailModalContext, (clientProductDetailContext: ClientProductDetailContextData) => clientProductDetailContext.showClientProductDetailModal);
  const closeClientProductDetailModal = useContextSelector(ClientProductDetailModalContext, (clientProductDetailContext: ClientProductDetailContextData) => clientProductDetailContext.closeClientProductDetailModal);

  return {
    showClientProductDetailModal,
    closeClientProductDetailModal
  };
}

export { ClientProductDetailModalProvider, useClientProductDetailModal };
