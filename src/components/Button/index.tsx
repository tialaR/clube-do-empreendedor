import React, { useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';
import { ButtonText, Container, ContainerView } from './styles';

interface Props extends TouchableOpacityProps {
  children: string;
  filled?: boolean;
  filledLight?: boolean;
  outlined?: boolean;
}

const Button: React.FC<Props> = ({ children, filled = false, filledLight = false, outlined = false, ...rest }) => {

  const buttontypes = useMemo(() => {
    return {
      filled, 
      filledLight, 
      outlined
    }
  }, [filled, filledLight, outlined]);
  
  return (
    <ContainerView buttontypes={buttontypes}>
      <Container {...rest} buttontypes={buttontypes}>
        <ButtonText buttontypes={buttontypes}>{children}</ButtonText>
      </Container>
    </ContainerView>
  );
};

export default Button;