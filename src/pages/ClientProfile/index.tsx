import React, { ReactNode } from 'react';

import { useAuth } from '../../hooks/useAuth';

import { Container, BodyContainer, RoundButtonContainer, RoundButtonContainerButton, RoundButtonText } from './styles';
import { BigTitle, SpacingY } from '../../styles/globalStyles';

type RoundButtonProps = {
  children: ReactNode;
  fullWidth?: boolean;
  onPress: () => void;
}

const RoundButton: React.FC<RoundButtonProps> = ({ children, onPress, fullWidth = false }) => (
  <RoundButtonContainer fullWidth={fullWidth}>
    <RoundButtonContainerButton onPress={onPress}>
      <RoundButtonText>{children}</RoundButtonText>
    </RoundButtonContainerButton>
  </RoundButtonContainer>
)

const ClientProfile: React.FC = () => {
  const { signOut } = useAuth();

  return (
      <Container>
          <BigTitle>Perfil</BigTitle>

          <BodyContainer>
              <SpacingY medium />
              <RoundButton fullWidth onPress={() => false}>Dados do Perfil</RoundButton>
              <SpacingY small />
              <RoundButton fullWidth onPress={() => false}>Meus Descontos</RoundButton>
              <SpacingY small />
              <RoundButton fullWidth onPress={() => false}>Configurações</RoundButton>
              <SpacingY small />
              <RoundButton onPress={signOut}>Sair da Conta</RoundButton>
          </BodyContainer>
      </Container>
  );
}

export default ClientProfile;