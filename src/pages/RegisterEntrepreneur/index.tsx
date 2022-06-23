import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import InputLine from '../../components/InputLine';

import { maskCNPJ, isValidCNPJ } from '../../utils/helpers';

import { colors } from '../../styles/colors';
import { HeaderContainer, Container, BodyContainer, ButtonsContainer, Pregress } from './styles';

const formElements = [
  { title: 'Nome Completo', value: '' },
  { title: 'Nome Fantasia', value: '' },
  { title: 'CNPJ', value: '' },
  { title: 'Endereço/CEP', value: '' },
  { title: 'Horário de funcionamento', value: '' },
  { title: 'Descrição da empresa', value: '' },
  { title: 'E-mail', value: '' },
  { title: 'Área de atuação', value: '' },
  { title: 'Redes Sociais', value: '' },
]

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  fantasyName: yup.string().required('Campo obrigatório'),
  cnpj: yup.string().matches(isValidCNPJ , 'Formato incorreto').required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  openingHours: yup.string().required('Campo obrigatório'),
  companyDescription: yup.string().required('Campo obrigatório'),
  email:yup.string().email("E-mail inválido").required("Campo obrigatório"),
  occupationArea: yup.string().required('Campo obrigatório'),
  socialNetworks: yup.string().required('Campo obrigatório'),
});


const RegisterEntrepreneur: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetInputs,
  } = useForm({ resolver: yupResolver(validationSchema) });
  
  const [progress, setProgress] = useState(0);
  const [cnpj, setCnpj] = useState('');

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

  const onSubmit = (data: any) => {
    Alert.alert(
      "Empresa cadastrada com sucesso",
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
                  render={({ field: {  onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Nome Completo" 
                      maxLength={100}
                      autoCorrect={false}
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
                  name="fantasyName"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: {  onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Nome fantasia" 
                      maxLength={100}
                      autoCorrect={false}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.fantasyName}
                      errorText={errors.fantasyName?.message}
                    />
                    )}
                />}

              {progress === 2 &&
                <Controller
                  name="cnpj"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onBlur, onChange} }) => (
                    <InputLine 
                      title="CNPJ" 
                      maxLength={19}
                      keyboardType='number-pad'
                      value={cnpj}
                      onBlur={onBlur}
                      onChangeText={e => { 
                        setCnpj(maskCNPJ(e));
                        onChange(e); 
                      }}
                      error={errors.cnpj}
                      errorText={errors.cnpj?.message} />
                    )}
                />}

              {progress === 3 &&
                <Controller
                  name="address"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <InputLine 
                      title="Endereço/CEP"
                      maxLength={10} 
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.address}
                      errorText={errors.address?.message} />
                    )}
                />}

              {progress === 4 &&
                <Controller
                  name="openingHours"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Horário de funcionamento" 
                      maxLength={150}
                      autoCorrect={false}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.openingHours}
                      errorText={errors.openingHours?.message} />
                    )}
                />}

            {progress === 5 &&
                <Controller
                  name="companyDescription"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Descrição da empresa" 
                      maxLength={200}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.companyDescription}
                      errorText={errors.companyDescription?.message} />
                    )}
                />}

            {progress === 6 &&
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="E-mail" 
                      maxLength={50}
                      keyboardType='email-address'
                      autoCorrect={false}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.email}
                      errorText={errors.email?.message} />
                    )}
                />}

            {progress === 7 &&
                <Controller
                  name="occupationArea"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Área de atuação" 
                      maxLength={200}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.occupationArea}
                      errorText={errors.occupationArea?.message} />
                    )}
                />}

            {progress === 8 &&
                <Controller
                  name="socialNetworks"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputLine 
                      title="Redes Sociais" 
                      maxLength={300}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.socialNetworks}
                      errorText={errors.socialNetworks?.message} />
                    )}
                />}
            </BodyContainer>

            <ButtonsContainer>
              {isProgressEnd ? 
                <Button outlinedLight onPress={handleSubmit(onSubmit)}>Continuar</Button>
                :
                <Button outlinedLight onPress={handleContinue}>Continuar</Button>
              }
            </ButtonsContainer>
        </Container>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default RegisterEntrepreneur;