import React, {useCallback, useEffect, useMemo} from 'react';
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
import {RouteProp, useNavigation} from '@react-navigation/native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import IconButton from '../../components/IconButton';

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
import {colors} from '../../styles/colors';

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(3, 'A senha deve conter no mínimo 3 caracteres'),
});

type ResetPasswrod = {
  token: string;
  uidb64: string;
};

type Props = {
  route: RouteProp<{params: {resetPasswordData: ResetPasswrod}}, 'params'>;
};

const RecoverPasswordConfirmation: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<any>();

  const resetPasswordData = useMemo(
    () => route?.params?.resetPasswordData,
    [route],
  );

  const {
    postResetPassword,
    response: resetPasswordResponse,
    isError: isPostResetPasswordError,
    isLoading: isPostResetPasswordLoading,
  } = ServiceResetPassword.usePatchResetPassword();

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
    if (resetPasswordResponse) {
      navigation.navigate('RecoverPasswordSucess');
      resetInputs();
    }
  }, [resetPasswordResponse]);

  const onSubmit = useCallback(
    (data?: any) => {
      postResetPassword({
        password: data?.password,
        token: resetPasswordData?.token,
        uidb64: resetPasswordData?.uidb64,
      });
    },
    [resetPasswordData],
  );

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
              <Description>{'Digite sua nova senha.'}</Description>
            </HeaderTexts>
          </HeaderContainer>
          <BodyContainer>
            <InputContainer>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <Input
                    placeholder="Senha"
                    maxLength={50}
                    secureTextEntry
                    autoCorrect={false}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    error={!!errors.password}
                    errorText={String(errors.password?.message)}
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

export default RecoverPasswordConfirmation;
