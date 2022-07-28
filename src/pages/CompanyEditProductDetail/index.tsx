import React, {useMemo} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {View} from 'react-native';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import CompanyProductDetail from '../../components/CompanyProductDetail';

import ServiceCompany from '../../services/company/company.service';

import {colors} from '../../styles/colors';
import {
  HeaderContainer,
  Container,
  BodyContainer,
  ButtonsContainer,
} from './styles';

type Props = {
  route: RouteProp<{params: {productId: number}}, 'params'>;
};

const CompanyEditProductDetail: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<any>();

  const {productId} = useMemo(() => route.params, [route]);

  const {
    response: product,
    isError,
    isLoading,
  } = ServiceCompany.useGetRegisteredProductDetail({productId});

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <HeaderContainer>
        <View style={{marginLeft: 20, paddingBottom: 30}}>
          <IconButton
            name="back"
            color={colors.white}
            width={30}
            height={30}
            onPress={handleBack}
          />
        </View>
      </HeaderContainer>

      <BodyContainer>
        {product && (
          <CompanyProductDetail
            product={product}
            isLoading={isLoading}
            error={isError}
          />
        )}
      </BodyContainer>

      <ButtonsContainer>
        <Button
          filledLight
          onPress={() => navigation.navigate('CompanyRegisterProduct')}>
          Editar Produto
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default CompanyEditProductDetail;
