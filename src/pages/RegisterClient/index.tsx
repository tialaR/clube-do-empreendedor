import React, {useMemo, useState} from 'react';
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

import {
  maskCPF,
  isValidCPF,
  maskDate,
  isValidDate,
  maskPhone,
  isValidPhone,
} from '../../utils/helpers';

import {colors} from '../../styles/colors';
import {
  HeaderContainer,
  Container,
  BodyContainer,
  ButtonsContainer,
} from './styles';

enum PageTitles {
  name = 'Nome Completo',
  cpf = 'CPF',
  birthDate = 'Data de Nascimento',
  address = 'Endereço',
  genre = 'Gênero',
  email = 'E-mail',
  telephone = 'Telefone',
}

const FORM_ELEMENTS_SIZE = 6;

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  cpf: yup
    .string()
    .matches(isValidCPF, 'Formato incorreto')
    .required('Campo obrigatório'),
  birthDate: yup
    .string()
    .matches(isValidDate, 'Formato incorreto')
    .required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  genre: yup.string().required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  telephone: yup
    .string()
    .matches(isValidPhone, 'Formato incorreto')
    .required('Campo obrigatório'),
});

const RegisterClient: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetInputs,
  } = useForm({resolver: yupResolver(validationSchema)});

  const [progress, setProgress] = useState(0);

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [genre, setGenre] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const isProgressEnd = useMemo(
    () => progress === FORM_ELEMENTS_SIZE,
    [progress],
  );
  const isProgressStart = useMemo(() => progress === 0, [progress]);

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
    Alert.alert(
      'Usuário cadastrado com sucesso',
      `${JSON.stringify(data)}`,
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
                    value={name}
                    maxLength={100}
                    autoCorrect={false}
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
                name="cpf"
                defaultValue={cpf}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onBlur, onChange}}) => (
                  <InputLine
                    title={PageTitles.cpf}
                    value={cpf}
                    maxLength={14}
                    keyboardType="number-pad"
                    onBlur={onBlur}
                    onChangeText={e => {
                      setCpf(maskCPF(e));
                      onChange(e);
                    }}
                    error={errors.cpf}
                    errorText={errors.cpf?.message}
                  />
                )}
              />
            )}

            {progress === 2 && (
              <Controller
                name="birthDate"
                defaultValue={birthDate}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.birthDate}
                    value={birthDate}
                    maxLength={10}
                    keyboardType="number-pad"
                    onBlur={onBlur}
                    onChangeText={e => {
                      setBirthDate(maskDate(e));
                      onChange(e);
                    }}
                    error={errors.birthDate}
                    errorText={errors.birthDate?.message}
                  />
                )}
              />
            )}

            {progress === 3 && (
              <Controller
                name="address"
                defaultValue={address}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.address}
                    value={address}
                    maxLength={150}
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setAddress(e);
                      onChange(e);
                    }}
                    error={errors.address}
                    errorText={errors.address?.message}
                  />
                )}
              />
            )}

            {progress === 4 && (
              <Controller
                name="genre"
                defaultValue={genre}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.genre}
                    value={genre}
                    maxLength={20}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setGenre(e);
                      onChange(e);
                    }}
                    error={errors.genre}
                    errorText={errors.genre?.message}
                  />
                )}
              />
            )}

            {progress === 5 && (
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
                    value={email}
                    maxLength={50}
                    keyboardType="email-address"
                    autoCorrect={false}
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

            {progress === 6 && (
              <Controller
                name="telephone"
                defaultValue={telephone}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.telephone}
                    value={telephone}
                    maxLength={15}
                    keyboardType="phone-pad"
                    onBlur={onBlur}
                    onChangeText={e => {
                      setTelephone(maskPhone(e));
                      onChange(e);
                    }}
                    error={errors.telephone}
                    errorText={errors.telephone?.message}
                  />
                )}
              />
            )}
          </BodyContainer>

          <ButtonsContainer>
            {isProgressEnd ? (
              <Button outlinedLight onPress={handleSubmit(onSubmit)}>
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

export default RegisterClient;
