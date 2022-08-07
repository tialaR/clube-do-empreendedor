import React, {useMemo} from 'react';

import ProductCard from '../../components/ProductCard';
import SearchHeader from '../../components/SearchHeader';
import SectionTitle from '../../components/SectionTitle';
import DividerContainerWithText from '../../components/DividerContainerWithText';

import {useClientProductDetailModal} from '../../hooks/useClientProductDetailModal';
import {MapModalProvider} from '../../hooks/useMapModal';

import ServiceClient from '../../services/client/client.service';
import {MyDiscountProduct, FeaturedProduct} from '../../services/client/types';

import {SpacingX} from '../../styles/globalStyles';
import {
  Container,
  ProducstList,
  SectionListContainer,
  SectionTitleContainer,
} from './styles';

const ClientDashboard: React.FC = () => {
  const {showClientProductDetailModal} = useClientProductDetailModal();

  const {response: myDiscountsList, isLoading: isMyDiscountsLoading} =
    ServiceClient.useGetMyDiscounts();
  const {response: featuredProductsList, isLoading: isFeaturedproductsLosding} =
    ServiceClient.useGetFeaturedProducts();

  const filteredMyDiscountsList = useMemo(
    () => myDiscountsList?.filter(item => item?.isCupomValid),
    [myDiscountsList],
  );

  const filteredFeaturedProductsList = useMemo(
    () => featuredProductsList?.filter(item => item?.isAvailable),
    [featuredProductsList],
  );

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
          data={filteredMyDiscountsList}
          keyExtractor={(product: MyDiscountProduct) => product?.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item: product}: {item: MyDiscountProduct}) => (
            <ProductCard
              loading={isMyDiscountsLoading}
              name={product?.name}
              img={product?.img}
              price={product?.price}
              promotion={product?.promotion}
              soldBy={product?.soldBy}
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
          data={filteredFeaturedProductsList}
          keyExtractor={(product: FeaturedProduct) => product?.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item: product}: {item: FeaturedProduct}) => (
            <ProductCard
              emphasis
              loading={isFeaturedproductsLosding}
              name={product?.name}
              img={product?.img}
              price={product?.price}
              promotion={product?.promotion}
              soldBy={product?.soldBy}
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
