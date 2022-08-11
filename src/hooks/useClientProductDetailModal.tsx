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
  showFeaturedProductDetailModal({
    productId,
    isEmphasisProduct,
  }: {
    productId: number | null;
    isEmphasisProduct?: boolean;
  }): void;
  showMyDiscountProductDetailModal({
    productId,
  }: {
    productId: number | null;
  }): void;
  closeFeaturedProductDetailModal(): void;
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
    getFeaturedProductDetail,
    response: featuredProductDetail,
    isLoading: isFeaturedProductLoading,
    isSuccess: isFeaturedProductSuccess,
    isError,
  } = ServiceClient.useGetFeaturedProductDetail();

  const {
    getMyDiscountProductDetail,
    response: myDiscountProductDetail,
    isLoading: isMyDiscountProductLoading,
    isSuccess: isMyDiscountProductSuccess,
  } = ServiceClient.useGetMyDiscountProductDetail();

  const featuredProductDetailModalRef =
    useRef<ClientProductDetailModalHandlersToFather>(null);

  const myDiscountProductDetailModalRef =
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
    isFeaturedProductSuccess &&
      featuredProductDetailModalRef.current?.openModal();
  }, [featuredProductDetailModalRef, isFeaturedProductSuccess]);

  useEffect(() => {
    isMyDiscountProductSuccess &&
      myDiscountProductDetailModalRef.current?.openModal();
  }, [myDiscountProductDetailModalRef, isMyDiscountProductSuccess]);

  const showFeaturedProductDetailModal = useCallback(
    ({
      productId,
      isEmphasisProduct,
    }: {
      productId: number;
      isEmphasisProduct: boolean;
    }) => {
      getFeaturedProductDetail(productId);
      setIsEmphasisProduct(isEmphasisProduct);
    },
    [],
  );

  const showMyDiscountProductDetailModal = useCallback(
    ({productId}: {productId: number}) => {
      getMyDiscountProductDetail(productId);
    },
    [],
  );

  const closeFeaturedProductDetailModal = useCallback(() => {
    featuredProductDetailModalRef.current?.closeModal();
  }, [featuredProductDetailModalRef]);

  const closeMyDiscountProductDetailModal = useCallback(() => {
    myDiscountProductDetailModalRef.current?.closeModal();
  }, [myDiscountProductDetailModalRef]);

  const renderFeaturedProductDetailModal = useCallback(() => {
    return (
      <ClientProductDetailModal
        ref={featuredProductDetailModalRef}
        product={featuredProductDetail}
        isLoading={isFeaturedProductLoading}
        emphasisProduct={isEmphasisProduct}
        onClose={closeFeaturedProductDetailModal}
      />
    );
  }, [
    isFeaturedProductLoading,
    isEmphasisProduct,
    featuredProductDetailModalRef,
    featuredProductDetail,
    closeFeaturedProductDetailModal,
  ]);

  const renderMyDiscountProductDetailModal = useCallback(() => {
    return (
      <ClientProductDetailModal
        ref={myDiscountProductDetailModalRef}
        product={myDiscountProductDetail}
        isLoading={isMyDiscountProductLoading}
        onClose={closeMyDiscountProductDetailModal}
      />
    );
  }, [
    isMyDiscountProductLoading,
    myDiscountProductDetailModalRef,
    myDiscountProductDetail,
    closeMyDiscountProductDetailModal,
  ]);

  return (
    <ClientProductDetailModalContext.Provider
      value={{
        showFeaturedProductDetailModal,
        showMyDiscountProductDetailModal,
        closeFeaturedProductDetailModal,
      }}>
      {children}
      {renderFeaturedProductDetailModal()}
      {renderMyDiscountProductDetailModal()}
    </ClientProductDetailModalContext.Provider>
  );
};

function useClientProductDetailModal(): ClientProductDetailContextData {
  const showFeaturedProductDetailModal = useContextSelector(
    ClientProductDetailModalContext,
    (clientProductDetailContext: ClientProductDetailContextData) =>
      clientProductDetailContext.showFeaturedProductDetailModal,
  );
  const showMyDiscountProductDetailModal = useContextSelector(
    ClientProductDetailModalContext,
    (clientProductDetailContext: ClientProductDetailContextData) =>
      clientProductDetailContext.showMyDiscountProductDetailModal,
  );
  const closeFeaturedProductDetailModal = useContextSelector(
    ClientProductDetailModalContext,
    (clientProductDetailContext: ClientProductDetailContextData) =>
      clientProductDetailContext.closeFeaturedProductDetailModal,
  );

  return {
    showFeaturedProductDetailModal,
    showMyDiscountProductDetailModal,
    closeFeaturedProductDetailModal,
  };
}

export {ClientProductDetailModalProvider, useClientProductDetailModal};
