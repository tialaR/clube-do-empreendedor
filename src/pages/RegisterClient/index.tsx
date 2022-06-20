import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from 'react-native';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import InputLine from '../../components/InputLine';

import { colors } from '../../styles/colors';
import { HeaderContainer, Container, BodyContainer, ButtonsContainer, Pregress } from './styles';

type UserRegister = {
  name: string;
  cpf: string;
  birthDate: string;
  address: string;
  genre: string;
  email: string;
  telephone: string;
}

const formElements = [
  { title: 'Nome Completo', value: '' },
  { title: 'CPF', value: '' },
  { title: 'Data de Nascimento', value: '' },
  { title: 'Endereço', value: '' },
  { title: 'Gênero', value: '' },
  { title: 'E-mail', value: '' },
  { title: 'Telefone', value: '' },
]

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  cpf: yup.string().required('Campo obrigatório'),
  birthDate: yup.string().required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  genre: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório'),
  telephone: yup.string().required('Campo obrigatório')
});


const RegisterClient: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetInputs,
  } = useForm({ resolver: yupResolver(validationSchema) });
  
  const [progress, setProgress] = useState(0);

  const isProgressEnd = useMemo(() => progress === formElements.length - 1, [progress, formElements]);
  const isProgressStart = useMemo(() => progress === 0, [progress]);

  const handleContinue = () => {
    if (isProgressEnd) {
      () => handleSubmit(onSubmit);
    }

    makeProgress();
  }

  const makeProgress = () => {
    if (isProgressEnd) return;

    setProgress(progress + 1);
  }

  const handleBack = () => {
    if (isProgressStart) navigation.goBack();

    setProgress(progress - 1);
  }

  const onSubmit = (data?: UserRegister) => {
    Alert.alert(
      "Usuário cadastrado com sucesso",
      `${JSON.stringify(data)}`,
      [{
          text: "Ok",
          onPress: () => { resetInputs(); navigation.goBack(); },
          style: "default",
        },],
      {
        cancelable: true,
        onDismiss: () => { resetInputs(); navigation.goBack(); }
      }
    );
  };

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

              {progress === 0 &&
                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Nome Completo" 
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.name}
                      errorText={errors.name?.message}
                    />
                    )}
                />}

              {progress === 1 &&
                <Controller
                  name="cpf"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="CPF" 
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.cpf}
                      errorText={errors.cpf?.message} />
                    )}
                />}

              {progress === 2 &&
                <Controller
                  name="birthDate"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Data de Nascimento" 
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.birthDate}
                      errorText={errors.birthDate?.message} />
                    )}
                />}

              {progress === 3 &&
                <Controller
                  name="address"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Endereço" 
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.address}
                      errorText={errors.address?.message} />
                    )}
                />}

            {progress === 4 &&
                <Controller
                  name="genre"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Gênero" 
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.genre}
                      errorText={errors.genre?.message} />
                    )}
                />}

            {progress === 5 &&
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="E-mail" 
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.email}
                      errorText={errors.email?.message} />
                    )}
                />}

            {progress === 6 &&
                <Controller
                  name="telephone"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Telefone" 
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.telephone}
                      errorText={errors.telephone?.message} />
                    )}
                />}
            </BodyContainer>

            <ButtonsContainer>
              {isProgressEnd ? 
                <Button filledLight onPress={handleSubmit(onSubmit)}>Continuar</Button>
                :
                <Button filledLight onPress={handleContinue}>Continuar</Button>
              }
            </ButtonsContainer>
        </Container>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default RegisterClient;