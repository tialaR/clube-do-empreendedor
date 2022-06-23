import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import InputLine from '../../components/InputLine';


import { colors } from '../../styles/colors';
import { HeaderContainer, Container, BodyContainer, ButtonsContainer, Pregress, Title, EntrepreneurProductDetailBodyContainer } from './styles';
import EntrepreneurProductDetail from '../../components/EntrepreneurProductDetail';
import { SpacingY } from '../../styles/globalStyles';

export type Product = {
  id: string;
  name: string;
  img: string;
  price: string;
  installment: string;
  promotion: string;
  soldBy: string;
  qrCodeImg: string;
}

enum PageTitles {
  productName = 'Nome do Produto',
  productPhotos = 'Fotos do Produto',
  productDescription = 'Descrição do Produto',
  discount = 'Desconto',
  productValue = 'Valor À vista e Valor Parcelado',
  productRegister = 'Produto Cadastrado!',
}

const FORM_ELEMENTS_SIZE = 4; 

const validationSchema = yup.object().shape({
  productName: yup.string().required('Campo obrigatório'),
  // productPhotos: yup.string().required('Campo obrigatório'),
  productDescription: yup.string().required('Campo obrigatório'),
  // discount: yup.string().required('Campo obrigatório'),
  productValue: yup.string().required('Campo obrigatório'),
});


const EntrepreneurRegisterProduct: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetInputs,
  } = useForm({ resolver: yupResolver(validationSchema) });
  
  const [progress, setProgress] = useState(0);
  const [productResgistered, setProductResgistered] = useState<Product | undefined>();

  const isProductRegistered = useMemo(() => !!productResgistered, [productResgistered]);

  const isProgressEnd = useMemo(() => progress === FORM_ELEMENTS_SIZE, [progress, FORM_ELEMENTS_SIZE]);
  const isProgressStart = useMemo(() => progress === 0, [progress]);

  const handleContinue = () => {
    if (isProgressEnd) {
      () => handleSubmit(onSubmit);
    }

    makeProgress();
  }

  const makeProgress = () => {
    if (isProgressEnd) return;

    setProgress(progress + 1);
  }

  const handleBack = () => {
    if (isProgressStart) navigation.goBack();

    setProgress(progress - 1);
  }

  const onSubmit = (data: any) => {
    setProductResgistered( { 
      id: '0', 
      name: 'Mac Monitor', 
      img: 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/01-43.png',
      price: 'R$ 1234.89',
      promotion: '16% OFF',
      soldBy: 'Eletro Magazine',
      installment: 'em 12x de R$ 28.90',
      qrCodeImg: 'https://www.gov.br/inss/pt-br/centrais-de-conteudo/imagens/qr-code-novo-fw-300x300-png'
    });
  
    resetInputs();
  };

  if (isProductRegistered) {
    return(
      <Container>
        <HeaderContainer>
                    <View style={{ marginLeft: 20 }}>
                      <IconButton icon="arrow-left-circle" color={colors.white} onPress={() => navigation.goBack()} />
                    </View>

                <View style={{ paddingTop: 14 }}>
                  <Pregress currentValue={progress} maxValue={FORM_ELEMENTS_SIZE} />
                </View>
            </HeaderContainer>

          <EntrepreneurProductDetailBodyContainer>
            <SpacingY medium />
            <Title>{PageTitles.productRegister}</Title>
            <SpacingY medium />
            {productResgistered && <EntrepreneurProductDetail product={productResgistered} />}
          </EntrepreneurProductDetailBodyContainer>
      </Container>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            enabled
        >
        <Container>
            <HeaderContainer>
                    <View style={{ marginLeft: 20 }}>
                      <IconButton icon="arrow-left-circle" color={colors.white} onPress={handleBack} />
                    </View>

                <View style={{ paddingTop: 14 }}>
                  <Pregress currentValue={progress} maxValue={FORM_ELEMENTS_SIZE} />
                </View>
            </HeaderContainer>

            <BodyContainer>
              {isProductRegistered ? (
                <>
                  <Title>{PageTitles.productRegister}</Title>
                  <SpacingY small />
                  {productResgistered && <EntrepreneurProductDetail product={productResgistered} />}
                  <SpacingY large />
                </>
              ) : (
                <>
                  {progress === 0 &&
                    <Controller
                      name="productName"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: {  onChange, onBlur, value } }) => (
                        <InputLine 
                          title={PageTitles.productName}
                          maxLength={200}
                          autoCorrect={false}
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          error={errors.productName}
                          errorText={errors.productName?.message}
                        />
                        )}
                    />}

                  {progress === 1 && (
                    <Title withPadding>{PageTitles.productPhotos}</Title>
                  )}

                  {progress === 2 &&
                    <Controller
                      name="productDescription"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputLine 
                          title={PageTitles.productDescription}
                          maxLength={500} 
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          error={errors.productDescription}
                          errorText={errors.productDescription?.message} />
                        )}
                    />}

                  {progress === 3 && (
                    <Title withPadding>{PageTitles.discount}</Title>
                  )}

                {progress === 4 &&
                    <Controller
                      name="productValue"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <InputLine 
                          title={PageTitles.productValue}
                          maxLength={200}
                          value={value}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          error={errors.productValue}
                          errorText={errors.productValue?.message} />
                        )}
                    />}
                </>
              )}

              
            </BodyContainer>

            <ButtonsContainer>
              {isProgressEnd ? 
                <Button outlinedLight onPress={handleSubmit(onSubmit)}>Concluir</Button>
                :
                <Button outlinedLight onPress={handleContinue}>Continuar</Button>
              }
            </ButtonsContainer>
        </Container>
        </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default EntrepreneurRegisterProduct;