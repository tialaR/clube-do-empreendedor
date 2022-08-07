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

import {
  maskCPF,
  isValidCPF,
  maskDate,
  isValidDate,
  maskPhone,
  isValidPhone,
  maskCEP,
  isValidCEP,
  removeMaskToNumbers,
  formatDateToSendToApi,
} from '../../utils/helpers';

import {colors} from '../../styles/colors';
import {
  HeaderContainer,
  Container,
  BodyContainer,
  ButtonsContainer,
} from './styles';
import {useAuth} from '../../hooks/useAuth';
import ServiceClient from '../../services/client/client.service';

enum PageTitles {
  name = 'Nome Completo',
  cpf = 'CPF',
  birthDate = 'Data de Nascimento',
  address = 'Endereço',
  cep = 'CEP',
  genre = 'Gênero (F/M)',
  email = 'E-mail',
  telephone = 'Telefone',
}

const FORM_ELEMENTS_SIZE = 7;

const validationSchema = yup.object().shape(
  {
    name: yup
      .string()
      .nullable()
      .notRequired()
      .when('name', {
        is: (value: string) => value?.length,
        then: rule => rule.min(4, 'Insira um nome válido'),
      }),
    email: yup
      .string()
      .nullable()
      .notRequired()
      .when('email', {
        is: (value: string) => value?.length,
        then: rule => rule.email('E-mail inválido'),
      }),
    cpf: yup
      .string()
      .required('Campo obrigatório')
      .matches(isValidCPF, 'Formato incorreto'),
    birthDate: yup
      .string()
      .nullable()
      .notRequired()
      .when('birthDate', {
        is: (value: string) => value?.length,
        then: rule => rule.matches(isValidDate, 'Formato incorreto'),
      }),
    address: yup
      .string()
      .nullable()
      .notRequired()
      .when('address', {
        is: (value: string) => value?.length,
        then: rule => rule.min(8, 'Insira um endereço válido'),
      }),
    cep: yup
      .string()
      .nullable()
      .notRequired()
      .when('cep', {
        is: (value: string) => value?.length,
        then: rule => rule.matches(isValidCEP, 'Formato incorreto'),
      }),
    genre: yup
      .string()
      .nullable()
      .notRequired()
      .when('genre', {
        is: (value: string) => value?.length,
        then: rule =>
          rule.test(
            'genre',
            'Formato inválido. Gêneros válidos: F ou M',
            value => value === 'F' || value === 'M',
          ),
      }),
    telephone: yup
      .string()
      .nullable()
      .notRequired()
      .when('telephone', {
        is: (value: string) => value?.length,
        then: rule => rule.matches(isValidPhone, 'Formato incorreto'),
      }),
  },
  [
    ['name', 'name'],
    ['email', 'email'],
    ['birthDate', 'birthDate'],
    ['address', 'address'],
    ['cep', 'cep'],
    ['genre', 'genre'],
    ['telephone', 'telephone'],
  ],
);

const ClientUpdate: React.FC = () => {
  const navigation = useNavigation<any>();

  const {userId} = useAuth();
  const {patchUser, isLoading, isError, isSuccess} =
    ServiceClient.usePatchUser();

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
  const [cep, setCep] = useState('');
  const [genre, setGenre] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');

  const isProgressEnd = useMemo(
    () => progress === FORM_ELEMENTS_SIZE,
    [progress],
  );
  const isProgressStart = useMemo(() => progress === 0, [progress]);

  useEffect(() => {
    isSuccess &&
      Alert.alert(
        'Dados do usuário atualizados com sucesso!',
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
  }, [isSuccess]);

  useEffect(() => {
    isError &&
      Alert.alert(
        'Ocorreu algum erro ao tentar atualizar os dados do usuário!',
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
  }, [isError]);

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
    const clientUpdated = {
      nome_completo: data?.name,
      cpf: data?.cpf,
      endereco: data?.address,
      cep: data?.cep,
      telefone_contato: removeMaskToNumbers(data?.telephone),
      data_nascimento: formatDateToSendToApi(data?.birthDate),
      genero: data?.genre,
      user: userId,
    };

    patchUser({
      client: clientUpdated,
      clientId: userId,
    });
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
                    maxLength={150}
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setName(e);
                      onChange(e);
                    }}
                    error={!!errors.name}
                    errorText={String(errors.name?.message)}
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
                    error={!!errors.cpf}
                    errorText={String(errors.cpf?.message)}
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
                    error={!!errors.birthDate}
                    errorText={String(errors.birthDate?.message)}
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
                    maxLength={120}
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setAddress(e);
                      onChange(e);
                    }}
                    error={!!errors.address}
                    errorText={String(errors.address?.message)}
                  />
                )}
              />
            )}

            {progress === 4 && (
              <Controller
                name="cep"
                defaultValue={cep}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.cep}
                    value={cep}
                    maxLength={10}
                    keyboardType="number-pad"
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setCep(maskCEP(e));
                      onChange(e);
                    }}
                    error={!!errors.cep}
                    errorText={String(errors.cep?.message)}
                  />
                )}
              />
            )}

            {progress === 5 && (
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
                    maxLength={1}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setGenre(e.toUpperCase());
                      onChange(e.toUpperCase());
                    }}
                    error={!!errors.genre}
                    errorText={String(errors.genre?.message)}
                  />
                )}
              />
            )}

            {progress === 6 && (
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
                    maxLength={245}
                    keyboardType="email-address"
                    autoCorrect={false}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setEmail(e);
                      onChange(e);
                    }}
                    error={!!errors.email}
                    errorText={String(errors.email?.message)}
                  />
                )}
              />
            )}

            {progress === 7 && (
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
                    error={!!errors.telephone}
                    errorText={String(errors.telephone?.message)}
                  />
                )}
              />
            )}
          </BodyContainer>

          <ButtonsContainer>
            {isProgressEnd ? (
              <Button
                outlinedLight
                loading={isLoading}
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

export default ClientUpdate;
