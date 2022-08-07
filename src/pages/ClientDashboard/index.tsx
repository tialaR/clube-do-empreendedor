import React, {useMemo} from 'react';

import ProductCard from '../../components/ProductCard';
import SearchHeader from '../../components/SearchHeader';
import SectionTitle from '../../components/SectionTitle';
import DividerContainerWithText from '../../components/DividerContainerWithText';

import {useClientProductDetailModal} from '../../hooks/useClientProductDetailModal';
import {MapModalProvider} from '../../hooks/useMapModal';

import ServiceClient from '../../services/client/client.service';
import {MyDiscountProduct, FeaturedProduct} from '../../services/client/types';

import {Loading, SpacingX} from '../../styles/globalStyles';
import {
  Container,
  MyDiscountsProducstList,
  FeaturedProducstList,
  SectionListContainer,
  SectionTitleContainer,
  ListLoadingContainer,
} from './styles';

const ClientDashboard: React.FC = () => {
  const {showClientProductDetailModal} = useClientProductDetailModal();

  const {
    response: myDiscountsList,
    isLoading: isMyDiscountsLoading,
    isFetching: isMyDiscountsFetching,
    isRefetching: isMyDiscountsRefetching,
  } = ServiceClient.useGetMyDiscounts();
  const {
    response: featuredProductsList,
    isLoading: isFeaturedproductsLosding,
    isFetching: isFeaturedproductsFetching,
    isRefetching: isFeaturedproductsRefetching,
  } = ServiceClient.useGetFeaturedProducts();

  const isMyDiscountsGeneralLoading = useMemo(
    () =>
      isMyDiscountsFetching || isMyDiscountsLoading || isMyDiscountsRefetching,
    [isMyDiscountsFetching, isMyDiscountsLoading, isMyDiscountsRefetching],
  );

  const isFeaturedproductsGeneralLoading = useMemo(
    () =>
      isFeaturedproductsLosding ||
      isFeaturedproductsFetching ||
      isFeaturedproductsRefetching,
    [
      isFeaturedproductsLosding,
      isFeaturedproductsFetching,
      isFeaturedproductsRefetching,
    ],
  );

  const filteredMyDiscountsList = useMemo(
    () => myDiscountsList?.filter(item => item?.isCupomValid),
    [myDiscountsList, isMyDiscountsGeneralLoading],
  );

  const filteredFeaturedProductsList = useMemo(
    () => featuredProductsList?.filter(item => item?.isAvailable),
    [featuredProductsList, isFeaturedproductsGeneralLoading],
  );

  const renderLoading = () => (
    <ListLoadingContainer>
      <Loading />
    </ListLoadingContainer>
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
        {isMyDiscountsGeneralLoading ? (
          <>{renderLoading()}</>
        ) : (
          <MyDiscountsProducstList<React.ElementType>
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
                store={product?.store}
                onPress={() =>
                  showClientProductDetailModal({productId: Number(product?.id)})
                }
              />
            )}
            ItemSeparatorComponent={() => <SpacingX medium />}
          />
        )}
      </SectionListContainer>

      <DividerContainerWithText text="Anúncio" />

      <SectionListContainer>
        <SectionTitleContainer>
          <SectionTitle>Produtos em Destaque</SectionTitle>
        </SectionTitleContainer>
        {isFeaturedproductsGeneralLoading ? (
          <>{renderLoading()}</>
        ) : (
          <FeaturedProducstList<React.ElementType>
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
                store={product?.store}
                onPress={() =>
                  showClientProductDetailModal({
                    productId: Number(product?.id),
                    isEmphasisProduct: true,
                  })
                }
              />
            )}
            ItemSeparatorComponent={() => <SpacingX medium />}
          />
        )}
      </SectionListContainer>
    </Container>
  );
};

export default ClientDashboard;
