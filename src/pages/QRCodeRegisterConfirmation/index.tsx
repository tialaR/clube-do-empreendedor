import React from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native';

import {Container, ConfirmationText} from './styles';

const QRCodeRegisterConfirmation: React.FC = () => {
  const navigation = useNavigation();

  // Back to dashboard
  const popAction = StackActions.pop(2);

  return (
    <TouchableWithoutFeedback onPress={() => navigation.dispatch(popAction)}>
      <Container>
        <ConfirmationText bold>
          {'QRCODE ESCANEADO \nCOM SUCESSO'}
        </ConfirmationText>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default QRCodeRegisterConfirmation;
