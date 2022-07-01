import React, {useMemo} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';

import {colors} from '../../styles/colors';
import {
  HeaderContainer,
  Container,
  BodyContainer,
  ButtonsContainer,
} from './styles';
import CompanyProductDetail from '../../components/CompanyProductDetail';

type Product = {
  id: string;
  name: string;
  img: string;
  price: string;
  installment: string;
  promotion: string;
  soldBy: string;
  qrCodeImg: string;
};

type Props = {
  route: RouteProp<{params: {product: Product}}, 'params'>;
};

const CompanyEditProductDetail: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<any>();

  const product = useMemo(() => route.params?.product, [route]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderContainer>
        <View style={{marginLeft: 20, paddingBottom: 30}}>
          <IconButton
            icon="chevron-left-circle-outline"
            color={colors.white}
            onPress={handleBack}
          />
        </View>
      </HeaderContainer>

      <BodyContainer>
        <CompanyProductDetail product={product} />
      </BodyContainer>

      <ButtonsContainer>
        <Button filledLight onPress={() => false}>
          Editar Produto
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default CompanyEditProductDetail;
