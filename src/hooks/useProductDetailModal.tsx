import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

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
    showProductDetailModal(
      { product, isEmphasisProduct }: { product: Product; isEmphasisProduct?: boolean }): void;
    closeProductDetailModal(): void;
};

const ProductDetailModalContext = createContext<ProductDetailContextData>({} as ProductDetailContextData);

type ProductDetailModalProviderProps = {
    children: ReactNode;
}

const ProductDetailModalProvider: React.FC<ProductDetailModalProviderProps> = ({ children }) => {
  const productDetailModalRef = useRef<ProductDetailModalHandlersToFather>(null);

  const [product, setProduct] = useState<Product | undefined>();
  const [isEmphasisProduct, setIsEmphasisProduct] = useState(false);

  const showProductDetailModal = useCallback((
    { product, isEmphasisProduct }: { product: Product, isEmphasisProduct: boolean }) => {
    productDetailModalRef.current?.openModal();

    setProduct(product);
    setIsEmphasisProduct(isEmphasisProduct)
    }, [productDetailModalRef]);

  const closeProductDetailModal = useCallback(() => {
    productDetailModalRef.current?.closeModal();
  }, [productDetailModalRef]);

  const renderProductDetailModal = useCallback(() => {
    return (
      <ProductDetailModal
        ref={productDetailModalRef}
        product={product}
        emphasisProduct={isEmphasisProduct}
        onClose={closeProductDetailModal}
      />
    );
  }, [productDetailModalRef, product, isEmphasisProduct, closeProductDetailModal]);

  return (
    <ProductDetailModalContext.Provider
      value={{
        showProductDetailModal,
        closeProductDetailModal,
      }}
    >
      {children}
      {renderProductDetailModal()}
    </ProductDetailModalContext.Provider>
  );
};

function useProductDetailModal(): ProductDetailContextData {
    const showProductDetailModal = useContextSelector(ProductDetailModalContext, (productDetailContext: ProductDetailContextData) => productDetailContext.showProductDetailModal);
  const closeProductDetailModal = useContextSelector(ProductDetailModalContext, (productDetailContext: ProductDetailContextData) => productDetailContext.closeProductDetailModal);

  return {
    showProductDetailModal,
    closeProductDetailModal
  };
}

export { ProductDetailModalProvider, useProductDetailModal };
