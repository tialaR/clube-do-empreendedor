import React, {useMemo} from 'react';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';
import {colors} from '../../styles/colors';
import {ButtonText, Container, ContainerView} from './styles';

interface Props extends TouchableOpacityProps {
  children: string;
  filled?: boolean;
  filledLight?: boolean;
  outlined?: boolean;
  outlinedLight?: boolean;
  loading?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  filled = false,
  filledLight = false,
  outlined = false,
  outlinedLight = false,
  loading = false,
  ...rest
}) => {
  const buttontypes = useMemo(() => {
    return {
      filled,
      filledLight,
      outlined,
      outlinedLight,
    };
  }, [filled, filledLight, outlined, outlinedLight]);

  return (
    <ContainerView buttontypes={buttontypes}>
      <Container {...rest} buttontypes={buttontypes}>
        {loading ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <ButtonText buttontypes={buttontypes}>{children}</ButtonText>
        )}
      </Container>
    </ContainerView>
  );
};

export default Button;
