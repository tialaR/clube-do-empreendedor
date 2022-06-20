import React, { ReactNode, useMemo } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import BigHeader from '../../components/BigHeader';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { SpacingY } from '../../styles/globalStyles';
import { Container, BodyHeader, BodyTitle, ButtonsContainer, BodyContents, BodyContainer, InputsContainer, LineButtonText, LineButtonsContainer, LineButtonContainer } from './styles';

type LineButtonProps = {
    children: ReactNode;
}

const LineButton: React.FC<LineButtonProps> = ({ children }) => {
    return (
        <LineButtonContainer>
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
      const navigation = useNavigation();
      const isClient = route.params?.isClient;

      const validationSchema = useMemo(() => isClient ? clientValidationSchema : entrepreneurValidationSchema, [isClient])

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
          "Alert Title",
          `${JSON.stringify(data)}`,
          [
            {
              text: "Cancel",
              onPress: () => resetInputs(),
              style: "cancel",
            },
          ],
          {
            cancelable: true,
            onDismiss: () => resetInputs(),
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
                                render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder='Digite seu CPF' 
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
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
                                render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder='Digite seu CNPJ' 
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
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
                        <LineButton>Esqueci minha senha</LineButton>
                        <LineButton>Primeiro acesso</LineButton>
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