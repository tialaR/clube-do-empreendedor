import React, {useEffect} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import ServiceResetPassword from '../../services/resetPassword/resetPassword.service';

import {
  Container,
  ButtonContainer,
  HeaderContainer,
  HeaderTexts,
  Title,
  Description,
  BodyContainer,
  InputContainer,
} from './styles';
import IconButton from '../../components/IconButton';
import {colors} from '../../styles/colors';

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
});

const RecoverPassword: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    postResetEmail,
    response: resetPasswordResponse,
    isError: isPostResetPasswordError,
    isLoading: isPostResetPasswordLoading,
  } = ServiceResetPassword.usePostResetEmail();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetInputs,
  } = useForm({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    isPostResetPasswordError &&
      Alert.alert(
        'Ocorreu algum erro ao tentar recuperar a senha!',
        'Tente novamente mais tarde.',
        [
          {
            text: 'Ok',
            onPress: () => false,
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => false,
        },
      );
  }, [isPostResetPasswordError]);

  useEffect(() => {
    if (resetPasswordResponse?.token && resetPasswordResponse?.uidb64) {
      navigation.navigate('RecoverPasswordConfirmation', {
        token: String(resetPasswordResponse?.token),
        uidb64: String(resetPasswordResponse?.uidb64),
      });
      resetInputs();
    }
  }, [resetPasswordResponse]);

  const onSubmit = (data?: any) => {
    postResetEmail({email: data?.email});
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <Container>
          <HeaderContainer>
            <IconButton
              name="back"
              color={colors.white}
              width={30}
              height={30}
              onPress={() => navigation.goBack()}
            />
            <HeaderTexts>
              <Title>Recuperar a senha</Title>
              <Description>
                {
                  'Digite seu e-mail para que possamos \nenviar um código de verificação.'
                }
              </Description>
            </HeaderTexts>
          </HeaderContainer>
          <BodyContainer>
            <InputContainer>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="E-mail"
                    maxLength={50}
                    keyboardType="email-address"
                    autoCorrect={false}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    error={!!errors.email}
                    errorText={String(errors.email?.message)}
                  />
                )}
              />
            </InputContainer>
          </BodyContainer>

          <ButtonContainer>
            <Button
              filled
              loading={isPostResetPasswordLoading}
              onPress={handleSubmit(onSubmit)}>
              Recuperar
            </Button>
          </ButtonContainer>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RecoverPassword;
