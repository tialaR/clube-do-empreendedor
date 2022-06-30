import React from 'react';
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

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetInputs,
  } = useForm({resolver: yupResolver(validationSchema)});

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = (data: any) => {
    resetInputs();
    navigation.navigate('CompanyRegisterCupomConfirmation');
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
                icon="arrow-left-circle"
                color={colors.white}
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
                  value={value}
                  onBlur={onBlur}
                  onChangeText={e => {
                    onChange(e);
                  }}
                  error={errors.cupom}
                  errorText={errors.cupom?.message}
                />
              )}
            />
          </BodyContainer>

          <ButtonsContainer>
            <Button outlinedLight onPress={handleSubmit(onSubmit)}>
              Cadastrar
            </Button>
          </ButtonsContainer>
        </Container>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CompanyRegisterCupom;
