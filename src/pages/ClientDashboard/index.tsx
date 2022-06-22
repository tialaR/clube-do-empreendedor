import React from 'react';
import { Text, View } from 'react-native';

import ProductCard from '../../components/ProductCard';
import SearchHeader from '../../components/SearchHeader';
import SectionTitle from '../../components/SectionTitle';

import { useProductDetailModal } from '../../hooks/useProductDetailModal';

import { colors } from '../../styles/colors';
import { SpacingX } from '../../styles/globalStyles';
import { Container, ProducstList, SectionListContainer, SectionTitleContainer } from './styles';

export type Product = {
    id: string;
    name: string;
    img: string;
    price: string;
    installment: string;
    promotion: string;
    soldBy: string;
    qrCodeImg: string;
}

const products: Product[] = [
    { 
        id: '0', 
        name: "Product one - Monitor Macbook teste Product one - Monitor Macbook teste Product one", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Eletro Magazine',
        installment: 'em 12x de R$ 28.90',
        qrCodeImg: 'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png'
    },
    { 
        id: '1', 
        name: "Product two", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Eletro Magazine',
        installment: 'em 12x de R$ 28.90',
        qrCodeImg: 'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png'
    },
    { 
        id: '2', 
        name: "Product tree - teste", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Eletro Magazine',
        installment: 'em 12x de R$ 28.90',
        qrCodeImg: 'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png'
    },
    { 
        id: '3', 
        name: "Product four", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Eletro Magazine',
        installment: 'em 12x de R$ 28.90',
        qrCodeImg: 'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png'
    },
    { 
        id: '4', 
        name: "Product", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Eletro Magazine',
        installment: 'em 12x de R$ 28.90',
        qrCodeImg: 'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png'
    },
]

const ClientDashboard: React.FC = () => {
  const { showProductDetailModal } = useProductDetailModal();

  return (
      <Container>
          <SearchHeader placeholder='Encontre empresas ou produtos' onPress={() => false} />

          <SectionListContainer>
            <SectionTitleContainer>
                <SectionTitle>Meus Descontos</SectionTitle>
            </SectionTitleContainer>
            <ProducstList
                    data={products}
                    keyExtractor={(product: Product) => product.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: product }: { item: Product }) => (
                        <ProductCard
                            name={product?.name}
                            img={product?.img}
                            price={product?.price}
                            promotion={product?.promotion}
                            soldBy={product?.soldBy}
                            installment={product?.installment}
                            onPress={() => showProductDetailModal(product)}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <SpacingX medium />
                    )}
                />
            </SectionListContainer>

            <View style={{
                backgroundColor: '#E4E3F9',
                paddingVertical: 20,
                alignItems: 'center'
            }}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: colors.indigoA200 }}>Anúncio</Text>
            </View>

            <SectionListContainer>
            <SectionTitleContainer>
                <SectionTitle>Produtos em Destaque</SectionTitle>
            </SectionTitleContainer>
            <ProducstList
                    data={products}
                    keyExtractor={(product: Product) => product.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: product }: { item: Product }) => (
                        <ProductCard
                            emphasis
                            name={product?.name}
                            img={product?.img}
                            price={product?.price}
                            promotion={product?.promotion}
                            soldBy={product?.soldBy}
                            installment={product?.installment}
                            onPress={() => showProductDetailModal(product)}
                        />
                    )}
                    ItemSeparatorComponent={() => (
                        <SpacingX medium />
                    )}
                />
            </SectionListContainer>
      </Container>
  );
}

export default ClientDashboard;