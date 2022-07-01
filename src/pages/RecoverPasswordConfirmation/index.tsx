import {StackActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';

import {Container, ConfirmationText} from './styles';

const RecoverPasswordConfirmation: React.FC = () => {
  const navigation = useNavigation();

  const backToLoginpopAction = StackActions.pop(2);

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.dispatch(backToLoginpopAction)}>
      <Container>
        <ConfirmationText>
          {'Enviamos para o seu e-mail um link para a recuperação da senha do '}
          <ConfirmationText bold>{'Clube do Empreendedor'}</ConfirmationText>
        </ConfirmationText>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default RecoverPasswordConfirmation;
