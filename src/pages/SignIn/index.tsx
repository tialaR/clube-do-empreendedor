import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import BigHeader from '../../components/BigHeader';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { maskCNPJ, maskCPF } from '../../utils/helpers';

import { SpacingY } from '../../styles/globalStyles';
import { Container, BodyHeader, BodyTitle, ButtonsContainer, BodyContents, BodyContainer, InputsContainer, LineButtonText, LineButtonsContainer, LineButtonContainer } from './styles';

type LineButtonProps = {
    children: ReactNode;
    onPress: () => void;
}

const LineButton: React.FC<LineButtonProps> = ({ children, onPress }) => {
    return (
        <LineButtonContainer onPress={onPress}>
            <LineButtonText>
                {children}
            </LineButtonText>
        </LineButtonContainer>
    )
}

const clientValidationSchema = yup.object().shape({
    cpf: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório')
}).required();

const entrepreneurValidationSchema = yup.object().shape({
    cnpj: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório')
}).required();

type SiginProps = {
    route: RouteProp<{ params: { isClient: boolean } }, 'params'>
}

const SignIn: React.FC<SiginProps> = ({ route }) => {
      const navigation = useNavigation<any>();

      const [cpf, setCpf] = useState('');
      const [cnpj, setCnpj] = useState('');

      const isClient = useMemo(() => route.params?.isClient, [route]);
      const validationSchema = useMemo(() => isClient ? clientValidationSchema : entrepreneurValidationSchema, [isClient])
      
      const handleFirstAccessNavigation = useCallback(() => {
          if (isClient) {
            navigation.navigate('RegisterClient')
          } else {
              navigation.navigate('RegisterEntrepreneur')
          } 
      },[navigation, isClient])

      const {
        control,
        handleSubmit,
        formState: { errors },
        reset: resetInputs,
      } = useForm({
        resolver: yupResolver(validationSchema)
      });

      const onSubmit = (data?: any) => {
        Alert.alert(
          "Login efetuado com sucesso",
          `${JSON.stringify(data)}`,
          [
            {
              text: "OK",
              onPress: () => {
                  setCnpj('');
                  setCpf('');
                  resetInputs();
              },
              style: "default",
            },
          ],
          {
            cancelable: true,
            onDismiss: () => {
                setCnpj('');
                setCpf('');
                resetInputs();
            },
          }
        );
      };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
        <Container>
            <BigHeader showBackButton onBackButtonPress={navigation.goBack} />

            <BodyContainer>

                <BodyContents>
                    <BodyHeader>
                        <BodyTitle>
                            Faça seu login
                        </BodyTitle>
                    </BodyHeader>

                    <SpacingY large />

                    <InputsContainer>
                        {isClient ? (
                            <Controller
                                name="cpf"
                                control={control}
                                rules={{
                                required: true,
                                }}
                                render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    placeholder='Digite seu CPF' 
                                    maxLength={14}
                                    keyboardType='number-pad'
                                    value={cpf}
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
                        ) : (
                            <Controller
                                name="cnpj"
                                control={control}
                                rules={{
                                required: true,
                                }}
                                render={({ field: { onChange, onBlur } }) => (
                                <Input
                                    placeholder='Digite seu CNPJ' 
                                    maxLength={19}
                                    keyboardType='number-pad'
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

                        <SpacingY small />
                        
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                            required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                placeholder='Digite sua senha' 
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
                        <LineButton onPress={() => navigation.navigate('RecoverPassword')}>Esqueci minha senha</LineButton>
                        <LineButton onPress={handleFirstAccessNavigation}>
                            Primeiro acesso
                        </LineButton>
                    </LineButtonsContainer>

                    <SpacingY large />

                    <ButtonsContainer>
                        <Button filled onPress={handleSubmit(onSubmit)}>Entrar</Button>
                    </ButtonsContainer>
                    
                </BodyContents>

            </BodyContainer>
        </Container>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default SignIn;