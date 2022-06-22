import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, ButtonContainer, HeaderContainer, HeaderTexts, Title, Description, BodyContainer, InputContainer } from './styles';
import IconButton from '../../components/IconButton';
import { colors } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const validationSchema = yup.object().shape({
    email:yup.string().email("E-mail inválido").required("Campo obrigatório"),
  });

const RecoverPassword: React.FC = () => {
    const navigation = useNavigation<any>();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset: resetInputs,
      } = useForm({ resolver: yupResolver(validationSchema) });

      const onSubmit = (data?: any) => {
        navigation.navigate('RecoverPasswordConfirmation');
      };
      
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
        <Container>
            <HeaderContainer>
                <IconButton icon="arrow-left-circle" color={colors.indigoA200} onPress={() => navigation.goBack()} />
                <HeaderTexts>
                    <Title>
                        Recuperar a senha
                    </Title>
                    <Description>
                            {'Digite seu e-mail para que possamos \nenviar um código de verificação.'}
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
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder="E-mail" 
                                    maxLength={50}
                                    keyboardType='email-address'
                                    autoCorrect={false}
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    error={errors.email}
                                    errorText={errors.email?.message}
                                />
                            )}
                        />
                    </InputContainer>
                </BodyContainer>

                <ButtonContainer>
                    <Button filled onPress={handleSubmit(onSubmit)}>Recuperar</Button>
                </ButtonContainer>
            </Container>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );
}

export default RecoverPassword;