import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from 'react-native';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import InputLine from '../../components/InputLine';

import { colors } from '../../styles/colors';
import { HeaderContainer, Container, BodyContainer, ButtonsContainer, Pregress } from './styles';

const formElements = [
  { title: 'Nome Completo', value: '' },
  { title: 'CPF', value: '' },
  { title: 'Data de Nascimento', value: '' },
  { title: 'Endereço', value: '' },
  { title: 'Gênero', value: '' },
  { title: 'E-mail', value: '' },
  { title: 'Telefone', value: '' },
]

const RegisterClient: React.FC = () => {
  const [progress, setProgress] = useState(0);

  const handleContinue = () => {
    if (progress === formElements.length - 1) return;

    setProgress(progress + 1);
  }

  const handleBack = () => {
    if (progress === 0) return;

    setProgress(progress - 1);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
        <Container>
            <HeaderContainer>
                <View style={{ marginLeft: 20 }}>
                  <IconButton icon="arrow-left-circle" color={colors.white} onPress={handleBack} />
                </View>
                <View style={{ paddingTop: 20 }}>
                  <Pregress currentValue={progress} maxValue={formElements.length} />
                </View>
            </HeaderContainer>

            <BodyContainer>

              {progress === 0 && <InputLine title="Nome Completo" />}
              {progress === 1 && <InputLine title="CPF" />}
              {progress === 2 && <InputLine title="Data de Nascimento" />}
              {progress === 3 && <InputLine title="Endereço" />}
              {progress === 4 && <InputLine title="Gênero" />}
              {progress === 5 && <InputLine title="E-mail" />}
              {progress === 6 && <InputLine title="Telefone" />}
            </BodyContainer>

            <ButtonsContainer>
              <Button filledLight onPress={handleContinue}>Continuar</Button>
            </ButtonsContainer>
        </Container>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default RegisterClient;