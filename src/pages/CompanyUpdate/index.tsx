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

import {maskCNPJ, isValidCNPJ} from '../../utils/helpers';

import {colors} from '../../styles/colors';
import {
  HeaderContainer,
  Container,
  BodyContainer,
  ButtonsContainer,
} from './styles';

enum PageTitles {
  name = 'Nome Completo',
  fantasyName = 'Nome Fantasia',
  cnpj = 'CNPJ',
  address = 'Endereço/CEP',
  openingHours = 'Horário de funcionamento',
  companyDescription = 'Descrição da empresa',
  email = 'E-mail',
  occupationArea = 'Área de atuação',
  socialNetworks = 'Redes Sociais',
}

const FORM_ELEMENTS_SIZE = 8;

const validationSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  fantasyName: yup.string().required('Campo obrigatório'),
  cnpj: yup
    .string()
    .matches(isValidCNPJ, 'Formato incorreto')
    .required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
  openingHours: yup.string().required('Campo obrigatório'),
  companyDescription: yup.string().required('Campo obrigatório'),
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  occupationArea: yup.string().required('Campo obrigatório'),
  socialNetworks: yup.string().required('Campo obrigatório'),
});

const CompanyUpdate: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetInputs,
  } = useForm({resolver: yupResolver(validationSchema)});

  const [progress, setProgress] = useState(0);

  const [name, setName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [address, setAddress] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [email, setEmail] = useState('tialarocha@gmail.com');
  const [occupationArea, setOccupationArea] = useState('');
  const [socialNetworks, setSocialNetworks] = useState('');

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
      'Empresa cadastrada com sucesso',
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
                    maxLength={100}
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
                name="fantasyName"
                defaultValue={fantasyName}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.fantasyName}
                    maxLength={100}
                    autoCorrect={false}
                    value={fantasyName}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setFantasyName(e);
                      onChange(e);
                    }}
                    error={errors.fantasyName}
                    errorText={errors.fantasyName?.message}
                  />
                )}
              />
            )}

            {progress === 2 && (
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
                    maxLength={10}
                    value={address}
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
                name="openingHours"
                defaultValue={openingHours}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.openingHours}
                    maxLength={150}
                    autoCorrect={false}
                    value={openingHours}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setOpeningHours(e);
                      onChange(e);
                    }}
                    error={errors.openingHours}
                    errorText={errors.openingHours?.message}
                  />
                )}
              />
            )}

            {progress === 5 && (
              <Controller
                name="companyDescription"
                defaultValue={companyDescription}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.companyDescription}
                    maxLength={200}
                    value={companyDescription}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setCompanyDescription(e);
                      onChange(e);
                    }}
                    error={errors.companyDescription}
                    errorText={errors.companyDescription?.message}
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
                    maxLength={50}
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

            {progress === 7 && (
              <Controller
                name="occupationArea"
                defaultValue={occupationArea}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.occupationArea}
                    maxLength={200}
                    value={occupationArea}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setOccupationArea(e);
                      onChange(e);
                    }}
                    error={errors.occupationArea}
                    errorText={errors.occupationArea?.message}
                  />
                )}
              />
            )}

            {progress === 8 && (
              <Controller
                name="socialNetworks"
                defaultValue={socialNetworks}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.socialNetworks}
                    maxLength={300}
                    value={socialNetworks}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setSocialNetworks(e);
                      onChange(e);
                    }}
                    error={errors.socialNetworks}
                    errorText={errors.socialNetworks?.message}
                  />
                )}
              />
            )}
          </BodyContainer>

          <ButtonsContainer>
            {isProgressEnd ? (
              <Button outlinedLight onPress={handleSubmit(onSubmit)}>
                Continuar
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

export default CompanyUpdate;
