import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';

import ProductCard from '../../components/ProductCard';
import SearchHeader from '../../components/SearchHeader';
import SectionTitle from '../../components/SectionTitle';
import {useCompanyDiscountClientsModal} from '../../hooks/useCompanyDiscountClientsModal';
import DividerContainerWithText from '../../components/DividerContainerWithText';

import {MapModalProvider} from '../../hooks/useMapModal';

import ServiceCompany from '../../services/company/company.service';
import {Product} from '../../services/company/types';

import {SpacingX, SpacingY} from '../../styles/globalStyles';
import {
  SquareIconContainer,
  Container,
  ProducstList,
  SectionListContainer,
  SectionTitleContainer,
  SectionButtonsContainer,
  SquareButtonContainer,
  SquareButtonText,
} from './styles';
import {SvgIcon} from '../../components/SvgIcon';
import {colors} from '../../styles/colors';

type SquareButtonProps = {
  onPress: () => void;
  icon: 'checkedQuare' | 'discount' | 'cupom';
};

const SquareButton: React.FC<SquareButtonProps> = ({icon, onPress}) => {
  const image = useMemo(() => {
    if (icon === 'checkedQuare') {
      return (
        <SvgIcon
          name="checkedSquare"
          color={colors.white}
          width={50}
          height={50}
        />
      );
    }
    if (icon === 'discount') {
      return (
        <SvgIcon name="discount" color={colors.white} width={50} height={50} />
      );
    }
    if (icon === 'cupom') {
      return (
        <SvgIcon name="cupom" color={colors.white} width={50} height={50} />
      );
    }

    return null;
  }, [icon]);

  const text = useMemo(() => {
    if (icon === 'checkedQuare') {
      return (
        <SquareButtonText>
          {'Cadastrar'}
          <SquareButtonText bold>{'\nPRODUTO'}</SquareButtonText>
        </SquareButtonText>
      );
    }
    if (icon === 'discount') {
      return <SquareButtonText>{'Clientes com\ndesconto'}</SquareButtonText>;
    }
    if (icon === 'cupom') {
      return (
        <SquareButtonText>
          {'Cadastrar'}
          <SquareButtonText bold>{'\nCUPOM'}</SquareButtonText>
        </SquareButtonText>
      );
    }

    return null;
  }, [icon]);

  return (
    <>
      <SquareButtonContainer onPress={onPress}>
        <SquareIconContainer>{image}</SquareIconContainer>
        {text}
      </SquareButtonContainer>
    </>
  );
};

const CompanyDashboard: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    response: registeredProductsList,
    isLoading,
    // isError,
  } = ServiceCompany.useGetRegisteredProducts();

  const {showDiscountClientModal} = useCompanyDiscountClientsModal();

  return (
    <Container>
      <MapModalProvider>
        <SearchHeader
          placeholder="Encontre Produtos"
          onSearchPress={() => false}
        />
      </MapModalProvider>

      <SectionListContainer>
        <SectionTitleContainer>
          <SectionTitle>Produtos Cadastrados</SectionTitle>
        </SectionTitleContainer>
        <ProducstList<React.ElementType>
          data={registeredProductsList}
          keyExtractor={(product: Product) => product.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item: product}: {item: Product}) => (
            <ProductCard
              loading={isLoading}
              name={product?.name}
              img={product?.img}
              price={product?.price}
              promotion={product?.promotion}
              soldBy={product?.soldBy}
              installment={product?.installment}
              onPress={() =>
                navigation.navigate('CompanyEditProductDetail', {
                  productId: product?.id,
                })
              }
            />
          )}
          ItemSeparatorComponent={() => <SpacingX medium />}
        />
      </SectionListContainer>

      <DividerContainerWithText text="Anúncio" />

      <SpacingY small />

      <SectionButtonsContainer>
        <SquareButton icon="discount" onPress={showDiscountClientModal} />
        <SpacingX medium />
        <SquareButton
          icon="cupom"
          onPress={() => navigation.navigate('CompanyRegisterCupom')}
        />
        <SpacingX medium />
        <SquareButton
          icon="checkedQuare"
          onPress={() => navigation.navigate('CompanyRegisterProduct')}
        />
      </SectionButtonsContainer>
    </Container>
  );
};

export default CompanyDashboard;
