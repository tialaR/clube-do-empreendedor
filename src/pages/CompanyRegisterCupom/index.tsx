import React, {useEffect} from 'react';
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

import ServiceCompany from '../../services/company/company.service';

import {useAuth} from '../../hooks/useAuth';

import {colors} from '../../styles/colors';
import {
  HeaderContainer,
  Container,
  BodyContainer,
  ButtonsContainer,
} from './styles';

const validationSchema = yup.object().shape({
  cupom: yup.string().required('Campo obrigatório'),
});

const CompanyRegisterCupom: React.FC = () => {
  const navigation = useNavigation<any>();

  const {userId} = useAuth();
  const {postCupom, isLoading, isSuccess, isError} =
    ServiceCompany.usePostCupom();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetInputs,
  } = useForm({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    isSuccess && navigation.navigate('CompanyRegisterCupomConfirmation');
  }, [isSuccess]);

  useEffect(() => {
    isError &&
      Alert.alert(
        'Ocorreu algum erro ao tentar cadastrar o cupom!',
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

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = (data: any) => {
    postCupom({
      discount: data?.cupom,
      storeId: userId,
      callback: () => resetInputs(),
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
            <View style={{marginLeft: 30, paddingBottom: 30}}>
              <IconButton
                name="back"
                color={colors.white}
                width={30}
                height={30}
                onPress={handleBack}
              />
            </View>
          </HeaderContainer>

          <BodyContainer>
            <Controller
              name="cupom"
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onBlur, onChange, value}}) => (
                <InputLine
                  title="Cadastro de Cupom"
                  keyboardType="number-pad"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={e => {
                    onChange(e);
                  }}
                  error={!!errors.cupom}
                  errorText={String(errors.cupom?.message)}
                />
              )}
            />
          </BodyContainer>

          <ButtonsContainer>
            <Button
              outlinedLight
              loading={isLoading}
              onPress={handleSubmit(onSubmit)}>
              Cadastrar
            </Button>
          </ButtonsContainer>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CompanyRegisterCupom;
