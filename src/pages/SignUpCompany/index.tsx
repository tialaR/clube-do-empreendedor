import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import InputLine from '../../components/InputLine';
import ProgressBar from '../../components/ProgressBar';

import {useAuth} from '../../hooks/useAuth';

import {maskCNPJ, isValidCNPJ, isValidName} from '../../utils/helpers';

import {colors} from '../../styles/colors';
import {
  HeaderContainer,
  Container,
  BodyContainer,
  ButtonsContainer,
} from './styles';

enum PageTitles {
  name = 'Nome do usuário',
  cnpj = 'CNPJ',
  email = 'E-mail',
  password = 'Senha',
}

const FORM_ELEMENTS_SIZE = 3;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      isValidName,
      '150 caracteres ou menos. Letras, números e @/./+/-/_ apenas.',
    )
    .required('Campo obrigatório.'),
  email: yup.string().email('E-mail inválido'),
  cnpj: yup
    .string()
    .matches(isValidCNPJ, 'Formato incorreto')
    .required('Campo obrigatório'),
  password: yup
    .string()
    .required('Campo obrigatório')
    .min(3, 'A senha deve conter no mínimo 3 caracteres'),
});

const SignUpCompany: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    signUp,
    isSignUpCompanyError,
    isSignUpCompanyloading,
    isSignUpCompanySuccess,
  } = useAuth();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetInputs,
  } = useForm({resolver: yupResolver(validationSchema)});

  const [progress, setProgress] = useState(0);

  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isProgressEnd = useMemo(
    () => progress === FORM_ELEMENTS_SIZE,
    [progress],
  );
  const isProgressStart = useMemo(() => progress === 0, [progress]);

  useEffect(() => {
    isSignUpCompanyError &&
      Alert.alert(
        'Ocorreu algum erro!',
        'Tente novamente mais tarde.',
        [
          {
            text: 'Ok',
            onPress: () => {
              resetInputs();
              navigation.goBack();
            },
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            resetInputs();
            navigation.goBack();
          },
        },
      );
  }, [isSignUpCompanyError]);

  useEffect(() => {
    isSignUpCompanySuccess &&
      Alert.alert(
        'Empresa cadastrada com sucesso!',
        '',
        [
          {
            text: 'Ok',
            onPress: () => {
              resetInputs();
              navigation.goBack();
            },
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {
            resetInputs();
            navigation.goBack();
          },
        },
      );
  }, [isSignUpCompanySuccess]);

  const handleContinue = () => {
    makeProgress();
  };

  const makeProgress = () => {
    if (isProgressEnd) {
      return;
    }

    setProgress(progress + 1);
  };

  const handleBack = () => {
    if (isProgressStart) {
      navigation.goBack();
    }

    setProgress(progress - 1);
  };

  const onSubmit = (data: any) => {
    const client = {
      username: data?.name,
      email: data?.email,
      cnpj: data?.cnpj,
      password: data?.password,
    };

    signUp(client);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <Container>
          <HeaderContainer>
            <View style={{marginLeft: 30}}>
              <IconButton
                name="back"
                color={colors.white}
                width={30}
                height={30}
                onPress={handleBack}
              />
            </View>
            <View style={{paddingTop: 14}}>
              <ProgressBar
                currentValue={progress}
                maxValue={FORM_ELEMENTS_SIZE}
              />
            </View>
          </HeaderContainer>

          <BodyContainer>
            {progress === 0 && (
              <Controller
                name="name"
                defaultValue={name}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.name}
                    maxLength={120}
                    autoCorrect={false}
                    value={name}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setName(e);
                      onChange(e);
                    }}
                    error={errors.name}
                    errorText={errors.name?.message}
                  />
                )}
              />
            )}

            {progress === 1 && (
              <Controller
                name="cnpj"
                defaultValue={cnpj}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onBlur, onChange}}) => (
                  <InputLine
                    title={PageTitles.cnpj}
                    maxLength={18}
                    keyboardType="number-pad"
                    value={cnpj}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setCnpj(maskCNPJ(e));
                      onChange(e);
                    }}
                    error={errors.cnpj}
                    errorText={errors.cnpj?.message}
                  />
                )}
              />
            )}

            {progress === 2 && (
              <Controller
                name="email"
                defaultValue={email}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.email}
                    maxLength={245}
                    keyboardType="email-address"
                    autoCorrect={false}
                    value={email}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setEmail(e);
                      onChange(e);
                    }}
                    error={errors.email}
                    errorText={errors.email?.message}
                  />
                )}
              />
            )}

            {progress === 3 && (
              <Controller
                name="password"
                defaultValue={password}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.password}
                    value={password}
                    maxLength={128}
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={e => {
                      setPassword(e);
                      onChange(e);
                    }}
                    error={errors.password}
                    errorText={errors.password?.message}
                  />
                )}
              />
            )}
          </BodyContainer>

          <ButtonsContainer>
            {isProgressEnd ? (
              <Button
                loading={isSignUpCompanyloading}
                outlinedLight
                onPress={handleSubmit(onSubmit)}>
                Concluir
              </Button>
            ) : (
              <Button outlinedLight onPress={handleContinue}>
                Continuar
              </Button>
            )}
          </ButtonsContainer>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignUpCompany;
