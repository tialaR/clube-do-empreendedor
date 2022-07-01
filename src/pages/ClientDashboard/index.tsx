import React from 'react';

import ProductCard from '../../components/ProductCard';
import SearchHeader from '../../components/SearchHeader';
import SectionTitle from '../../components/SectionTitle';
import DividerContainerWithText from '../../components/DividerContainerWithText';

import {useClientProductDetailModal} from '../../hooks/useClientProductDetailModal';
import {MapModalProvider} from '../../hooks/useMapModal';

import {SpacingX} from '../../styles/globalStyles';
import {
  Container,
  ProducstList,
  SectionListContainer,
  SectionTitleContainer,
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

const ClientDashboard: React.FC = () => {
  const {showClientProductDetailModal} = useClientProductDetailModal();

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
              onPress={() => showClientProductDetailModal({product: product})}
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
          data={products}
          keyExtractor={(product: Product) => product.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item: product}: {item: Product}) => (
            <ProductCard
              emphasis
              name={product?.name}
              img={product?.img}
              price={product?.price}
              promotion={product?.promotion}
              soldBy={product?.soldBy}
              installment={product?.installment}
              onPress={() =>
                showClientProductDetailModal({
                  product: product,
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
