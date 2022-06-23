import styled from 'styled-components/native';
import { colors } from '../../styles/colors';

export const Container = styled.View`
  background-color: ${colors.indigo50};
  padding: 24px 24px 0;

  flex: 1;
`;

export const BodyContainer = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;
`;

export const CleanNotificationListContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CleanNotificationListText = styled.Text`
  margin-left: 4px;
  font-size: 15px;
  font-weight: 700;
  color: ${colors.indigoA200};
`;
