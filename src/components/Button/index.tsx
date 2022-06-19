import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ButtonText, Container, ContainerView } from './styles';

interface Props extends TouchableOpacityProps {
  children: string;
  filled?: boolean;
}

const Button: React.FC<Props> = ({ children, filled = false, ...rest }) => {
  return (
    <ContainerView filled={filled}>
      <Container {...rest} filled={filled}>
        <ButtonText filled={filled}>{children}</ButtonText>
      </Container>
    </ContainerView>
  );
};

export default Button;