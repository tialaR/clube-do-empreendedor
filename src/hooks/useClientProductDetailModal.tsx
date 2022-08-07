import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {createContext, useContextSelector} from 'use-context-selector';

import ServiceClient from '../services/client/client.service';

import ClientProductDetailModal, {
  ClientProductDetailModalHandlersToFather,
} from '../components/ClientProductDetailModal';
import {Alert} from 'react-native';

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
  const {
    getProductDetail,
    response: product,
    isLoading,
    isSuccess,
    isError,
  } = ServiceClient.useGetProductDetail();

  const productDetailModalRef =
    useRef<ClientProductDetailModalHandlersToFather>(null);

  const [isEmphasisProduct, setIsEmphasisProduct] = useState(false);

  useEffect(() => {
    isError &&
      Alert.alert(
        'Ocorreu algum erro ao tentar exibir o detalhe desse produto!',
        'Tente novamente mais tarde.',
        [
          {
            text: 'Ok',
            onPress: () => false,
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => false,
        },
      );
  }, [isError]);

  useEffect(() => {
    isSuccess && productDetailModalRef.current?.openModal();
  }, [productDetailModalRef, isSuccess]);

  const showClientProductDetailModal = useCallback(
    ({
      productId,
      isEmphasisProduct,
    }: {
      productId: number;
      isEmphasisProduct: boolean;
    }) => {
      getProductDetail(productId);
      setIsEmphasisProduct(isEmphasisProduct);
    },
    [],
  );

  const closeClientProductDetailModal = useCallback(() => {
    productDetailModalRef.current?.closeModal();
  }, [productDetailModalRef]);

  const renderClientProductDetailModal = useCallback(() => {
    return (
      <ClientProductDetailModal
        ref={productDetailModalRef}
        product={product}
        isLoading={isLoading}
        emphasisProduct={isEmphasisProduct}
        onClose={closeClientProductDetailModal}
      />
    );
  }, [
    isLoading,
    isEmphasisProduct,
    productDetailModalRef,
    product,
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
