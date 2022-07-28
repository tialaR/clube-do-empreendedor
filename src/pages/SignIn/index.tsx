import React, {ReactNode, useCallback, useMemo, useEffect} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import BigHeader from '../../components/BigHeader';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {useAuth} from '../../hooks/useAuth';

import {isValidUserName} from '../../utils/helpers';

import {SpacingY} from '../../styles/globalStyles';
import {
  Container,
  BodyHeader,
  BodyTitle,
  ButtonsContainer,
  BodyContents,
  BodyContainer,
  InputsContainer,
  LineButtonText,
  LineButtonsContainer,
  LineButtonContainer,
} from './styles';

type LineButtonProps = {
  children: ReactNode;
  onPress: () => void;
};

const LineButton: React.FC<LineButtonProps> = ({children, onPress}) => {
  return (
    <LineButtonContainer onPress={onPress}>
      <LineButtonText>{children}</LineButtonText>
    </LineButtonContainer>
  );
};

const validationSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .matches(
        isValidUserName,
        'Formato incorreto. Esse campo deve ter 150 caracteres ou menos. Letras, números e @/./+/-/_ apenas.',
      )
      .required('Campo obrigatório'),
    password: yup
      .string()
      .required('Campo obrigatório')
      .min(3, 'A senha deve conter no mínimo 3 caracteres'),
  })
  .required();

type SiginProps = {
  route: RouteProp<{params: {isClient: boolean}}, 'params'>;
};

const SignIn: React.FC<SiginProps> = ({route}) => {
  const navigation = useNavigation<any>();
  const {signIn, isLoginError, isLoginLoading} = useAuth();

  const isClient = useMemo(() => route.params?.isClient, [route]);

  useEffect(() => {
    isLoginError &&
      Alert.alert(
        'Ocorreu algum erro!',
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
  }, [isLoginError]);

  const handleFirstAccessNavigation = useCallback(() => {
    if (isClient) {
      navigation.navigate('SignUpClient');
    } else {
      navigation.navigate('SignUpCompany');
    }
  }, [navigation, isClient]);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetInputs,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data?: any) => {
    signIn({
      username: data?.username,
      password: data?.password,
    });
    resetInputs();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <Container>
          <BigHeader showBackButton onBackButtonPress={navigation.goBack} />

          <BodyContainer>
            <BodyContents>
              <BodyHeader>
                <BodyTitle>Faça seu login</BodyTitle>
              </BodyHeader>

              <SpacingY large />

              <InputsContainer>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="Digite seu usuário"
                      maxLength={150}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.username}
                      errorText={errors.username?.message}
                    />
                  )}
                />
                <SpacingY small />
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <Input
                      placeholder="Digite sua senha"
                      value={value}
                      secureTextEntry
                      onBlur={onBlur}
                      onChangeText={onChange}
                      error={errors.password}
                      errorText={errors.password?.message}
                    />
                  )}
                />
              </InputsContainer>

              <SpacingY medium />

              <LineButtonsContainer>
                <LineButton
                  onPress={() => navigation.navigate('RecoverPassword')}>
                  Esqueci minha senha
                </LineButton>
                <LineButton onPress={handleFirstAccessNavigation}>
                  Primeiro acesso
                </LineButton>
              </LineButtonsContainer>

              <SpacingY large />

              <ButtonsContainer>
                <Button
                  filled
                  loading={isLoginLoading}
                  onPress={handleSubmit(onSubmit)}>
                  Entrar
                </Button>
              </ButtonsContainer>
            </BodyContents>
          </BodyContainer>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
