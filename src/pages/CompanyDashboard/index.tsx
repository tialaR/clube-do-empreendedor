import {useNavigation} from '@react-navigation/native';
import React, {ReactNode, useMemo} from 'react';

import ProductCard from '../../components/ProductCard';
import SearchHeader from '../../components/SearchHeader';
import SectionTitle from '../../components/SectionTitle';
import {useCompanyDiscountClientsModal} from '../../hooks/useCompanyDiscountClientsModal';
import DividerContainerWithText from '../../components/DividerContainerWithText';

import {MapModalProvider} from '../../hooks/useMapModal';

import Cupom from '../../assets/cupom.svg';
import CheckedSquare from '../../assets/checkedSquare.svg';
import Discount from '../../assets/discount.svg';
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

export type Product = {
  id: string;
  name: string;
  img: string;
  price: string;
  installment: string;
  promotion: string;
  soldBy: string;
  qrCodeImg: string;
};

const products: Product[] = [
  {
    id: '0',
    name: 'Product one - Monitor Macbook teste Product one - Monitor Macbook teste Product one',
    img: 'https://i.pinimg.com/originals/c5/95/c9/c595c9dc092cb7fbfecedde02a6952ae.png',
    price: 'R$ 1234.89',
    promotion: '16% OFF',
    soldBy: 'Eletro Magazine',
    installment: 'em 12x de R$ 28.90',
    qrCodeImg:
      'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png',
  },
  {
    id: '1',
    name: 'Product two',
    img: 'https://www.dhcp.com.br/media/wysiwyg/descricoes/dell/vostro-3470_monitor-e1916h.png',
    price: 'R$ 1234.89',
    promotion: '16% OFF',
    soldBy: 'Eletro Magazine',
    installment: 'em 12x de R$ 28.90',
    qrCodeImg:
      'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png',
  },
  {
    id: '2',
    name: 'Product tree - teste',
    img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MX432?wid=266&hei=291&fmt=png-alpha&.v=1570119317387',
    price: 'R$ 1234.89',
    promotion: '16% OFF',
    soldBy: 'Eletro Magazine',
    installment: 'em 12x de R$ 28.90',
    qrCodeImg:
      'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png',
  },
  {
    id: '3',
    name: 'Product four',
    img: 'https://lojaonline.vivo.com.br/medias/sys_master/root/h3c/hca/13503022989342/POSICAO1-DGAP104C3000.png',
    price: 'R$ 1234.89',
    promotion: '16% OFF',
    soldBy: 'Eletro Magazine',
    installment: 'em 12x de R$ 28.90',
    qrCodeImg:
      'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png',
  },
  {
    id: '4',
    name: 'Product',
    img: 'https://www.uniir.com.br/wp-content/uploads/2021/03/uniir-aluguel-de-celular-aparelho-iphone-12.png',
    price: 'R$ 1234.89',
    promotion: '16% OFF',
    soldBy: 'Eletro Magazine',
    installment: 'em 12x de R$ 28.90',
    qrCodeImg:
      'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png',
  },
];

type SquareButtonProps = {
  onPress: () => void;
  icon: 'checkedQuare' | 'discount' | 'cupom';
};

const SquareButton: React.FC<SquareButtonProps> = ({icon, onPress}) => {
  const image = useMemo(() => {
    if (icon === 'checkedQuare') {
      return <CheckedSquare />;
    }
    if (icon === 'discount') {
      return <Discount />;
    }
    if (icon === 'cupom') {
      return <Cupom />;
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
          data={products}
          keyExtractor={(product: Product) => product.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item: product}: {item: Product}) => (
            <ProductCard
              name={product?.name}
              img={product?.img}
              price={product?.price}
              promotion={product?.promotion}
              soldBy={product?.soldBy}
              installment={product?.installment}
              onPress={() =>
                navigation.navigate('CompanyEditProductDetail', {product})
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
