import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import ProductCard from '../../components/ProductCard';
import SearchHeader from '../../components/SearchHeader';
import SectionTitle from '../../components/SectionTitle';
import { useDiscountClientsModal } from '../../hooks/useDiscountClientsModal';

import { colors } from '../../styles/colors';
import { SpacingX, SpacingY } from '../../styles/globalStyles';
import { SquareIconContainer, Container, ProducstList, SectionListContainer, SectionTitleContainer, SectionButtonsContainer, SquareButtonContainer, SquareButtonText } from './styles';

export type Product = {
    id: string;
    name: string;
    img: string;
    price: string;
    installment: string;
    promotion: string;
    soldBy: string;
}

const products: Product[] = [
    { 
        id: '0', 
        name: "Product one - Monitor Macbook teste", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Vendido por Eletro Magazine',
        installment: 'em 12x de R$ 28.90'
    },
    { 
        id: '1', 
        name: "Product two", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Vendido por Eletro Magazine',
        installment: 'em 12x de R$ 28.90'
    },
    { 
        id: '2', 
        name: "Product tree - teste", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Vendido por Eletro Magazine',
        installment: 'em 12x de R$ 28.90'
    },
    { 
        id: '3', 
        name: "Product four", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Vendido por Eletro Magazine',
        installment: 'em 12x de R$ 28.90'

    },
    { 
        id: '4', 
        name: "Product", 
        img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
        price: 'R$ 1234.89',
    	promotion: '16% OFF',
        soldBy: 'Vendido por Eletro Magazine',
        installment: 'em 12x de R$ 28.90'

    },
]

type SquareButtonProps = {
    onPress: () => void;
    children: ReactNode;
}

const SquareButton: React.FC<SquareButtonProps> = ({ children, onPress }) => {
    return(
        <>
        <SquareButtonContainer onPress={onPress}>
            <SquareIconContainer>
                <Icon name="user" size={40} color={colors.white} />
            </SquareIconContainer>
            {children}
        </SquareButtonContainer>
        </>
    )
}

const EntrepreneurDashboard: React.FC = () => {
  const navigation = useNavigation<any>();
  const { showDiscountClientModal } = useDiscountClientsModal();

  return (
      <Container>
          <SearchHeader placeholder="Encontre Produtos" onPress={() => false} />

          <SectionListContainer>
            <SectionTitleContainer>
                <SectionTitle>Produtos Cadastrados</SectionTitle>
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
                            onPress={() => false}
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
            
            <SpacingY small />

            <SectionButtonsContainer>
                <SquareButton onPress={showDiscountClientModal}>
                    <SquareButtonText>{`Clientes com\ndesconto`}</SquareButtonText>
                </SquareButton>
                <SpacingX medium />
                <SquareButton onPress={() => navigation.navigate('EntrepreneurRegisterCupom')}>
                    <SquareButtonText>
                        {`Cadastrar`}
                        <SquareButtonText bold>{`\nCUPOM`}</SquareButtonText>
                    </SquareButtonText>
                </SquareButton>
                <SpacingX medium />
                <SquareButton onPress={() => false}>
                    <SquareButtonText>
                        {`Cadastrar`}
                        <SquareButtonText bold>{`\nPRODUTO`}</SquareButtonText>
                    </SquareButtonText>
                </SquareButton>
            </SectionButtonsContainer>
      </Container>
  );
}

export default EntrepreneurDashboard;