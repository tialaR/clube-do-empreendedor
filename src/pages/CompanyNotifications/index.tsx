import React from 'react';

import {SvgIcon} from '../../components/SvgIcon';

import {
  Container,
  BodyContainer,
  CleanNotificationListContainer,
  CleanNotificationListText,
} from './styles';
import {colors} from '../../styles/colors';
import {BigTitle} from '../../styles/globalStyles';

const CompanyNotifications: React.FC = () => {
  return (
    <Container>
      <BigTitle>Notificações</BigTitle>

      <BodyContainer>
        <CleanNotificationListContainer>
          <SvgIcon
            name="notificationDeactivated"
            width={30}
            height={30}
            color={colors.indigoA200}
          />
          <CleanNotificationListText>
            Não há notificaçãoes
          </CleanNotificationListText>
        </CleanNotificationListContainer>
      </BodyContainer>
    </Container>
  );
};

export default CompanyNotifications;
