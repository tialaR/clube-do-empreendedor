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

import ServiceCompany from '../../services/company/company.service';
import {useAuth} from '../../hooks/useAuth';

import {
  maskCNPJ,
  isValidCNPJ,
  isValidCEP,
  maskCEP,
  isValidPhone,
  maskPhone,
  removeMaskToNumbers,
} from '../../utils/helpers';

import {colors} from '../../styles/colors';
import {
  HeaderContainer,
  Container,
  BodyContainer,
  ButtonsContainer,
} from './styles';

enum PageTitles {
  fantasyName = 'Nome Fantasia',
  cnpj = 'CNPJ',
  address = 'Endereço',
  cep = 'CEP',
  openingTime = 'Horário de abertura',
  closingTime = 'Horário de fechamento',
  companyDescription = 'Descrição da empresa',
  email = 'E-mail',
  occupationArea = 'Área de atuação',
  telephone = 'Telefone de contato',
  whatsApp = 'WhatsApp',
  instagram = 'Instagram',
  facebook = 'Facebook',
}

const FORM_ELEMENTS_SIZE = 12;

const validationSchema = yup.object().shape(
  {
    fantasyName: yup
      .string()
      .nullable()
      .notRequired()
      .when('fantasyName', {
        is: (value: string) => value?.length,
        then: rule => rule.min(4, 'Insira um nome válido'),
      }),
    cnpj: yup
      .string()
      .required('Campo obrigatório')
      .matches(isValidCNPJ, 'Formato incorreto'),
    address: yup
      .string()
      .nullable()
      .notRequired()
      .when('address', {
        is: (value: string) => value?.length,
        then: rule => rule.min(10, 'Insira um endereço válido'),
      }),
    cep: yup
      .string()
      .nullable()
      .notRequired()
      .when('cep', {
        is: (value: string) => value?.length,
        then: rule => rule.matches(isValidCEP, 'Formato incorreto'),
      }),
    openingTime: yup.string(),
    closingTime: yup.string(),
    companyDescription: yup.string(),
    email: yup
      .string()
      .nullable()
      .notRequired()
      .when('email', {
        is: (value: string) => value?.length,
        then: rule => rule.email('E-mail inválido'),
      }),
    occupationArea: yup.string(),
    telephone: yup
      .string()
      .nullable()
      .notRequired()
      .when('telephone', {
        is: (value: string) => value?.length,
        then: rule => rule.matches(isValidPhone, 'Formato incorreto'),
      }),
    whatsApp: yup
      .string()
      .nullable()
      .notRequired()
      .when('whatsApp', {
        is: (value: string) => value?.length,
        then: rule => rule.matches(isValidPhone, 'Formato incorreto'),
      }),
    instagram: yup.string(),
    facebook: yup.string(),
  },
  [
    ['fantasyName', 'fantasyName'],
    ['address', 'address'],
    ['cep', 'cep'],
    ['email', 'email'],
    ['telephone', 'telephone'],
    ['whatsApp', 'whatsApp'],
  ],
);

const CompanyUpdate: React.FC = () => {
  const navigation = useNavigation<any>();

  const {userId} = useAuth();

  const {response: company} = ServiceCompany.useGetCompany({companyId: userId});

  const {patchCompany, isLoading, isSuccess, isError} =
    ServiceCompany.usePatchCompany();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetInputs,
  } = useForm({resolver: yupResolver(validationSchema)});

  const [progress, setProgress] = useState(0);

  const [fantasyName, setFantasyName] = useState(company?.fantasyName ?? '');
  const [cnpj, setCnpj] = useState(maskCNPJ(String(company?.cnpj)) ?? '');
  const [address, setAddress] = useState(company?.address ?? '');
  const [cep, setCep] = useState(maskCEP(String(company?.cep)) ?? '');
  const [openingTime, setOpeningTime] = useState(company?.openingTime ?? '');
  const [closingTime, setClosingTime] = useState(company?.closingTime ?? '');
  const [companyDescription, setCompanyDescription] = useState(
    company?.companyDescription ?? '',
  );
  const [email, setEmail] = useState(company?.email ?? '');
  const [occupationArea, setOccupationArea] = useState(
    company?.occupationArea ?? '',
  );
  const [telephone, setTelephone] = useState(
    maskPhone(String(company?.telephone)) ?? '',
  );
  const [whatsApp, setWhatsApp] = useState(
    maskPhone(String(company?.whatsApp)) ?? '',
  );
  const [instagram, setInstagram] = useState(company?.instagram ?? '');
  const [facebook, setFacebook] = useState(company?.facebook ?? '');

  const isProgressEnd = useMemo(
    () => progress === FORM_ELEMENTS_SIZE,
    [progress],
  );
  const isProgressStart = useMemo(() => progress === 0, [progress]);

  useEffect(() => {
    isSuccess &&
      Alert.alert(
        'Dados da empresa atualizados com sucesso!',
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
        'Ocorreu algum erro ao tentar atualizar os dados da empresa!',
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
    const companyUpdated = {
      fantasyName: data?.fantasyName,
      cnpj: removeMaskToNumbers(data?.cnpj),
      facebook: data?.facebook,
      instagram: data?.instagram,
      whatsApp: removeMaskToNumbers(data?.whatsApp),
      address: data?.address,
      cep: removeMaskToNumbers(data?.cep),
      email: data?.email,
      telephone: removeMaskToNumbers(data?.telephone),
      openingTime: data?.openingTime,
      closingTime: data?.closingTime,
      companyDescription: data?.companyDescription,
      occupationArea: data?.occupationArea,
      user: userId,
    };

    patchCompany({
      company: companyUpdated,
      companyId: userId,
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
                name="fantasyName"
                defaultValue={fantasyName}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.fantasyName}
                    maxLength={120}
                    autoCorrect={false}
                    value={fantasyName}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setFantasyName(e);
                      onChange(e);
                    }}
                    error={!!errors.fantasyName}
                    errorText={String(errors.fantasyName?.message)}
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
                    error={!!errors.cnpj}
                    errorText={String(errors.cnpj?.message)}
                  />
                )}
              />
            )}

            {progress === 2 && (
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
                    maxLength={120}
                    value={address}
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

            {progress === 3 && (
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

            {progress === 4 && (
              <Controller
                name="openingTime"
                defaultValue={openingTime}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.openingTime}
                    maxLength={150}
                    autoCorrect={false}
                    value={openingTime}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setOpeningTime(e);
                      onChange(e);
                    }}
                    error={!!errors.openingTime}
                    errorText={String(errors.openingTime?.message)}
                  />
                )}
              />
            )}

            {progress === 5 && (
              <Controller
                name="closingTime"
                defaultValue={closingTime}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.closingTime}
                    maxLength={150}
                    autoCorrect={false}
                    value={closingTime}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setClosingTime(e);
                      onChange(e);
                    }}
                    error={!!errors.closingTime}
                    errorText={String(errors.closingTime?.message)}
                  />
                )}
              />
            )}

            {progress === 6 && (
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
                    error={!!errors.companyDescription}
                    errorText={String(errors.companyDescription?.message)}
                  />
                )}
              />
            )}

            {progress === 7 && (
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
                    error={!!errors.email}
                    errorText={String(errors.email?.message)}
                  />
                )}
              />
            )}

            {progress === 8 && (
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
                    maxLength={255}
                    value={occupationArea}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setOccupationArea(e);
                      onChange(e);
                    }}
                    error={!!errors.occupationArea}
                    errorText={String(errors.occupationArea?.message)}
                  />
                )}
              />
            )}

            {progress === 9 && (
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

            {progress === 10 && (
              <Controller
                name="whatsApp"
                defaultValue={whatsApp}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.whatsApp}
                    maxLength={15}
                    keyboardType="phone-pad"
                    value={whatsApp}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setWhatsApp(maskPhone(e));
                      onChange(e);
                    }}
                    error={!!errors.whatsApp}
                    errorText={String(errors.whatsApp?.message)}
                  />
                )}
              />
            )}

            {progress === 11 && (
              <Controller
                name="instagram"
                defaultValue={instagram}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.instagram}
                    maxLength={200}
                    value={instagram}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setInstagram(e);
                      onChange(e);
                    }}
                    error={!!errors.instagram}
                    errorText={String(errors.instagram?.message)}
                  />
                )}
              />
            )}

            {progress === 12 && (
              <Controller
                name="facebook"
                defaultValue={facebook}
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, onBlur}}) => (
                  <InputLine
                    title={PageTitles.facebook}
                    maxLength={200}
                    value={facebook}
                    onBlur={onBlur}
                    onChangeText={e => {
                      setFacebook(e);
                      onChange(e);
                    }}
                    error={!!errors.facebook}
                    errorText={String(errors.facebook?.message)}
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

export default CompanyUpdate;
