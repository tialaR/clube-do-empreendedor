import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import {  Alert, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';

import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import InputLine from '../../components/InputLine';
import CompanyProductDetail from '../../components/CompanyProductDetail';
import ExpandableListPanel from '../../components/ExpandableListPanel';


import { colors } from '../../styles/colors';
import { SpacingX, SpacingY } from '../../styles/globalStyles';
import { HeaderContainer, Container, ProductPhotosContainer, ProductPhoto, BodyContainer, ButtonsContainer, Pregress, Title, CompanyProductDetailBodyContainer } from './styles';

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

type Code = {
  label: string;
  value: string | undefined;
};

const FORM_ELEMENTS_SIZE = 4; 

const validationSchema = yup.object().shape({
  productName: yup.string().required('Campo obrigatório'),
  productDescription: yup.string().required('Campo obrigatório'),
  productValue: yup.string().required('Campo obrigatório'),
});

const productPhotosValidationSchema = yup.object().shape({
  value: yup.string().required('Campo obrigatório'),
});

const discountCodeValidationSchema = yup.object().shape({
  label: yup.string().required('Campo obrigatório'),
  value: yup.string().required('Campo obrigatório'),
});

const CompanyRegisterProduct: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: resetInputs,
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [photos, setPhotos] = useState(undefined);
  const [selectedDiscountCode, setSelectedDiscountCode] = useState<Code>({ label: "Selecione um códido", value: undefined });
  const discountCodes = [
    {label: 'CÓDIGO 01', value: 'CÓDIGO 01'},
    {label: 'CÓDIGO 02', value: 'CÓDIGO 02'},
    {label: 'CÓDIGO 03', value: 'CÓDIGO 03'},
    {label: 'CÓDIGO 04', value: 'CÓDIGO 04'},
    {label: 'CÓDIGO 05', value: 'CÓDIGO 05'},
    {label: 'CÓDIGO 06', value: 'CÓDIGO 06'},
    {label: 'CÓDIGO 07', value: 'CÓDIGO 07'},
    {label: 'CÓDIGO 08', value: 'CÓDIGO 08'},
    {label: 'CÓDIGO 09', value: 'CÓDIGO 09'},
    {label: 'CÓDIGO 10', value: 'CÓDIGO 10'},
    {label: 'CÓDIGO 11', value: 'CÓDIGO 10'},
    {label: 'CÓDIGO 12', value: 'CÓDIGO 10'},
    {label: 'CÓDIGO 13', value: 'CÓDIGO 10'},
    {label: 'CÓDIGO 14', value: 'CÓDIGO 10'},
    {label: 'CÓDIGO 15', value: 'CÓDIGO 10'},
  ];
  
  const [progress, setProgress] = useState(0);
  const [productResgistered, setProductResgistered] = useState<Product | undefined>();

  const [discountCodeError, setDiscountCodeError] = useState<string | undefined>(undefined);
  const [photosError, setPhotosError] = useState<string | undefined>(undefined);

  const isProductRegistered = useMemo(() => !!productResgistered, [productResgistered]);

  const isProgressEnd = useMemo(() => progress === FORM_ELEMENTS_SIZE, [progress, FORM_ELEMENTS_SIZE]);
  const isProgressStart = useMemo(() => progress === 0, [progress]);
  const isSelectedDiscountCode = useMemo(() => selectedDiscountCode.value !== undefined, [selectedDiscountCode]);

  useEffect(() => {
    if (progress === 1) {
      productPhotosValidationSchema.validate(photos).catch((err) => {
        setPhotosError(err.errors[0]);
      });
    }

    if (progress === 4) {
      discountCodeValidationSchema.validate(selectedDiscountCode).catch((err) => {
        setDiscountCodeError(err.errors[0]);
      });
    }
  }, [progress]);

  useEffect(() => {
    setDiscountCodeError(undefined);
  }, [isSelectedDiscountCode]);

  const handleContinue = () => {
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
    const showRegisterProductPage = isProgressEnd && isSelectedDiscountCode;

    if (showRegisterProductPage) {
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
    }
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

          <CompanyProductDetailBodyContainer>
            <SpacingY medium />
            <Title>{PageTitles.productRegister}</Title>
            <SpacingY medium />
            {productResgistered && <CompanyProductDetail product={productResgistered} />}
          </CompanyProductDetailBodyContainer>
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
                  {productResgistered && <CompanyProductDetail product={productResgistered} />}
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
                    <>
                      <Title withPadding>{PageTitles.productPhotos}</Title>
                      <SpacingY medium />
                        <ProductPhotosContainer>
                            <ProductPhoto />
                            <SpacingX small />
                            <ProductPhoto />
                            <SpacingX small />
                            <ProductPhoto />
                        </ProductPhotosContainer>
                        <SpacingY small />
                        <ProductPhotosContainer>
                            <ProductPhoto />
                            <SpacingX small />
                            <ProductPhoto />
                            <SpacingX small />
                            <ProductPhoto />
                        </ProductPhotosContainer>
                    </>
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
                    <>
                      <Title withPadding>{PageTitles.discount}</Title>
                      <SpacingY medium />
                      <ExpandableListPanel 
                        title={selectedDiscountCode?.label}
                        list={discountCodes} 
                        onItemSelect={setSelectedDiscountCode}
                        error={true}
                        errorText={discountCodeError}
                      />
                    </>  
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

export default CompanyRegisterProduct;