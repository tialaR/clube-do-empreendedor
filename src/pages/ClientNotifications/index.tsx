import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles/colors';

import { Container, BodyContainer, CleanNotificationListContainer, CleanNotificationListText } from './styles';
import { BigTitle } from '../../styles/globalStyles';

const ClientNotifications: React.FC = () => {
  return (
      <Container>
          <BigTitle>Notificações</BigTitle>

          <BodyContainer>
              <CleanNotificationListContainer>
                <Icon name='bell-off' size={24} color={colors.indigoA200} />
                <CleanNotificationListText>
                    Não há notificaçãoes
                </CleanNotificationListText>
              </CleanNotificationListContainer>
          </BodyContainer>
      </Container>
  );
}

export default ClientNotifications;