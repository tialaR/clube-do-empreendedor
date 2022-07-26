import React, {useEffect} from 'react';

import ProductCard from '../../components/ProductCard';
import SearchHeader from '../../components/SearchHeader';
import SectionTitle from '../../components/SectionTitle';
import DividerContainerWithText from '../../components/DividerContainerWithText';

import {useClientProductDetailModal} from '../../hooks/useClientProductDetailModal';
import {MapModalProvider} from '../../hooks/useMapModal';

import ServiceClient from '../../services/client/client.service';
import {Product} from '../../services/client/types';

import {SpacingX} from '../../styles/globalStyles';
import {
  Container,
  ProducstList,
  SectionListContainer,
  SectionTitleContainer,
} from './styles';

const ClientDashboard: React.FC = () => {
  const {showClientProductDetailModal} = useClientProductDetailModal();

  const {
    getMyDiscounts,
    data: myDiscounts,
    isLoading: isMyDiscountsLoading,
  } = ServiceClient.useGetMyDiscounts();
  const {
    getFeaturedProducts,
    data: featuredProducts,
    isLoading: isFeaturedproductsLosding,
  } = ServiceClient.useGetFeaturedProducts();

  useEffect(() => {
    getMyDiscounts();
    getFeaturedProducts();
  }, []);

  return (
    <Container>
      <MapModalProvider>
        <SearchHeader
          placeholder="Encontre empresas ou produtos"
          onSearchPress={() => false}
        />
      </MapModalProvider>

      <SectionListContainer>
        <SectionTitleContainer>
          <SectionTitle>Meus Descontos</SectionTitle>
        </SectionTitleContainer>
        <ProducstList<React.ElementType>
          data={myDiscounts}
          keyExtractor={(product: Product) => product.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item: product}: {item: Product}) => (
            <ProductCard
              loading={isMyDiscountsLoading}
              name={product?.name}
              img={product?.img}
              price={product?.price}
              promotion={product?.promotion}
              soldBy={product?.soldBy}
              installment={product?.installment}
              onPress={() =>
                showClientProductDetailModal({productId: product?.id})
              }
            />
          )}
          ItemSeparatorComponent={() => <SpacingX medium />}
        />
      </SectionListContainer>

      <DividerContainerWithText text="Anúncio" />

      <SectionListContainer>
        <SectionTitleContainer>
          <SectionTitle>Produtos em Destaque</SectionTitle>
        </SectionTitleContainer>
        <ProducstList<React.ElementType>
          data={featuredProducts}
          keyExtractor={(product: Product) => product.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item: product}: {item: Product}) => (
            <ProductCard
              emphasis
              loading={isFeaturedproductsLosding}
              name={product?.name}
              img={product?.img}
              price={product?.price}
              promotion={product?.promotion}
              soldBy={product?.soldBy}
              installment={product?.installment}
              onPress={() =>
                showClientProductDetailModal({
                  productId: product?.id,
                  isEmphasisProduct: true,
                })
              }
            />
          )}
          ItemSeparatorComponent={() => <SpacingX medium />}
        />
      </SectionListContainer>
    </Container>
  );
};

export default ClientDashboard;
