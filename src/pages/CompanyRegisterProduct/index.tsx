import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
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
import CompanyProductDetail from '../../components/CompanyProductDetail';
import ExpandableListPanel from '../../components/ExpandableListPanel';
import ProgressBar from '../../components/ProgressBar';
import {SvgIcon} from '../../components/SvgIcon';
import RadioButton from '../../components/RadioButton';

import ServiceCompany from '../../services/company/company.service';

import {formatCurrencyBRL} from '../../utils/helpers';

import {colors} from '../../styles/colors';
import {SpacingX, SpacingY} from '../../styles/globalStyles';
import {
  HeaderContainer,
  Container,
  ProductPhotosContainer,
  ProductPhoto,
  BodyContainer,
  ButtonsContainer,
  Title,
  CompanyProductDetailBodyContainer,
  ProductPhotoImage,
  ErrorMessage,
} from './styles';
import {RegisteredProduct} from '../../services/company/types';

enum PageTitles {
  productName = 'Nome do Produto',
  productPhotos = 'Fotos do Produto',
  productDescription = 'Descrição do Produto',
  discount = 'Desconto',
  price = 'Preço',
  availability = 'Disponibilidade',
  store = 'Loja',
  category = 'Categoria',
  productRegister = 'Produto Cadastrado!',
}

type Code = {
  label: string;
  value: string | undefined;
};

const FORM_ELEMENTS_SIZE = 7;

const validationSchema = yup.object().shape({
  productName: yup.string().required('Campo obrigatório'),
  productDescription: yup.string(),
  price: yup.string().required('Campo obrigatório'),
  store: yup.string().required('Campo obrigatório'),
  category: yup.string().required('Campo obrigatório'),
});

const productPhotosValidationSchema = yup
  .array()
  .min(1, 'Pelo menos uma foto deve ser adicionada')
  .of(
    yup
      .object()
      .shape({
        uri: yup.string(),
        type: yup.string(),
        name: yup.string(),
      })
      .required('Pelo menos uma foto deve ser adicionada'),
  );

const discountCodeValidationSchema = yup.object().shape({
  label: yup.string().required('Campo obrigatório'),
  value: yup.string().required('Campo obrigatório'),
});

type Photo = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};

const CompanyRegisterProduct: React.FC = () => {
  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetInputs,
  } = useForm({resolver: yupResolver(validationSchema)});

  const {
    postProduct,
    isLoading: isLoadingPostProduct,
    response: productRegistered,
  } = ServiceCompany.usePostProduct();

  const discountCodes = [
    {label: 'CÓDIGO 01', value: '01'},
    {label: 'CÓDIGO 02', value: '02'},
    {label: 'CÓDIGO 03', value: '03'},
    {label: 'CÓDIGO 04', value: '04'},
    {label: 'CÓDIGO 05', value: '05'},
    {label: 'CÓDIGO 06', value: '06'},
    {label: 'CÓDIGO 07', value: '07'},
    {label: 'CÓDIGO 08', value: '08'},
    {label: 'CÓDIGO 09', value: '09'},
    {label: 'CÓDIGO 10', value: '10'},
    {label: 'CÓDIGO 11', value: '10'},
    {label: 'CÓDIGO 12', value: '10'},
    {label: 'CÓDIGO 13', value: '10'},
    {label: 'CÓDIGO 14', value: '10'},
  ];

  const [progress, setProgress] = useState(0);

  const [productName, setProductName] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([] as Photo[]);
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(false);
  const [store, setStore] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDiscountCode, setSelectedDiscountCode] = useState<Code>({
    label: 'Selecione um códido',
    value: undefined,
  });

  const [productResgistered, setProductResgistered] = useState<
    RegisteredProduct | undefined
  >();

  const [discountCodeError, setDiscountCodeError] = useState<
    string | undefined
  >(undefined);
  const [photosError, setPhotosError] = useState<string | undefined>(undefined);

  const isProductRegistered = useMemo(
    () => !!productResgistered,
    [productResgistered],
  );

  const isProgressEnd = useMemo(
    () => progress === FORM_ELEMENTS_SIZE,
    [progress],
  );
  const isProgressStart = useMemo(() => progress === 0, [progress]);

  const isSelectedDiscountCode = useMemo(
    () => selectedDiscountCode.value !== undefined,
    [selectedDiscountCode],
  );
  const isSelectedPhoto = useMemo(() => photos.length > 0, [photos]);

  useEffect(() => {
    if (progress === 2) {
      productPhotosValidationSchema.validate(photos).catch(err => {
        setPhotosError(err.errors[0]);
      });
    }

    if (progress === 6) {
      discountCodeValidationSchema.validate(selectedDiscountCode).catch(err => {
        setDiscountCodeError(err.errors[0]);
      });
    }
  }, [progress, photos, selectedDiscountCode]);

  useEffect(() => {
    setDiscountCodeError(undefined);
  }, [isSelectedDiscountCode]);

  useEffect(() => {
    setPhotosError(undefined);
  }, [isSelectedPhoto]);

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
    const productUpdated = {
      name: data?.productName,
      description: data?.productDescription,
      price: data?.price,
      availability: availability,
      category: data?.category,
      cupom: selectedDiscountCode.value,
      image: photos[0],
      store: data?.store,
    };

    postProduct({
      product: productUpdated,
    });
  };

  useEffect(() => {
    const showRegisterProductPage =
      isProgressEnd &&
      isSelectedDiscountCode &&
      isSelectedPhoto &&
      productRegistered;

    if (showRegisterProductPage) {
      setProductResgistered({
        id: productRegistered?.id,
        name: productRegistered?.name,
        img: productRegistered?.img,
        price: formatCurrencyBRL(productRegistered?.price),
        promotion: productRegistered?.promotion,
        store: productRegistered?.store,
        qrCodeImg: productRegistered?.qrCodeImg,
        isAvailable: productRegistered?.isAvailable,
        description: productRegistered?.description,
        category: productRegistered?.description,
      });

      resetInputs();
    }
  }, [
    productRegistered,
    isProgressEnd,
    isSelectedDiscountCode,
    isSelectedPhoto,
  ]);

  const handleSelectPhoto = (selectedPhotoIndex: number) => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response: ImagePickerResponse) => {
        let images = [...photos];

        if (response && response?.assets?.[0].uri) {
          const image = {
            uri: response?.assets?.[0].uri,
            type: response?.assets?.[0].type,
            name: response?.assets?.[0].fileName,
          };

          images[selectedPhotoIndex] = image;

          setPhotos(images);
        }
      },
    );
  };

  const handleAvailability = (value: string) => {
    if (value === 'Disponível') {
      setAvailability(true);
    } else {
      setAvailability(false);
    }
  };

  if (isProductRegistered) {
    return (
      <Container>
        <HeaderContainer>
          <View style={{marginLeft: 30}}>
            <IconButton
              name="back"
              color={colors.white}
              width={30}
              height={30}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={{paddingTop: 14}}>
            <ProgressBar
              currentValue={progress}
              maxValue={FORM_ELEMENTS_SIZE}
            />
          </View>
        </HeaderContainer>

        <CompanyProductDetailBodyContainer>
          <SpacingY large />
          <Title>{PageTitles.productRegister}</Title>
          <SpacingY small />

          {productResgistered && (
            <CompanyProductDetail product={productResgistered} />
          )}
        </CompanyProductDetailBodyContainer>
      </Container>
    );
  }

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
            {isProductRegistered ? (
              <>
                <Title>{PageTitles.productRegister}</Title>
                <SpacingY small />
                {productResgistered && (
                  <CompanyProductDetail product={productResgistered} />
                )}
                <SpacingY large />
              </>
            ) : (
              <>
                {progress === 0 && (
                  <Controller
                    name="productName"
                    defaultValue={productName}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur}}) => (
                      <InputLine
                        title={PageTitles.productName}
                        value={productName}
                        maxLength={200}
                        autoCorrect={false}
                        onBlur={onBlur}
                        onChangeText={e => {
                          setProductName(e);
                          onChange(e);
                        }}
                        error={!!errors.productName}
                        errorText={String(errors.productName?.message)}
                      />
                    )}
                  />
                )}

                {progress === 1 && (
                  <>
                    <Title withPadding>{PageTitles.productPhotos}</Title>
                    <SpacingY medium />
                    <ProductPhotosContainer>
                      <ProductPhoto onPress={() => handleSelectPhoto(0)}>
                        {photos[0]?.uri ? (
                          <ProductPhotoImage
                            source={{
                              uri: photos[0]?.uri,
                            }}
                          />
                        ) : (
                          <SvgIcon
                            name="image"
                            width={20}
                            height={20}
                            color={colors.black}
                          />
                        )}
                      </ProductPhoto>
                      <SpacingX small />
                      <ProductPhoto onPress={() => handleSelectPhoto(1)}>
                        {photos[1]?.uri ? (
                          <ProductPhotoImage
                            source={{
                              uri: photos[1]?.uri,
                            }}
                          />
                        ) : (
                          <SvgIcon
                            name="image"
                            width={20}
                            height={20}
                            color={colors.black}
                          />
                        )}
                      </ProductPhoto>
                      <SpacingX small />
                      <ProductPhoto onPress={() => handleSelectPhoto(2)}>
                        {photos[2]?.uri ? (
                          <ProductPhotoImage
                            source={{
                              uri: photos[2]?.uri,
                            }}
                          />
                        ) : (
                          <SvgIcon
                            name="image"
                            width={20}
                            height={20}
                            color={colors.black}
                          />
                        )}
                      </ProductPhoto>
                    </ProductPhotosContainer>
                    <SpacingY small />
                    <ProductPhotosContainer>
                      <ProductPhoto onPress={() => handleSelectPhoto(3)}>
                        {photos[3]?.uri ? (
                          <ProductPhotoImage
                            source={{
                              uri: photos[3]?.uri,
                            }}
                          />
                        ) : (
                          <SvgIcon
                            name="image"
                            width={20}
                            height={20}
                            color={colors.black}
                          />
                        )}
                      </ProductPhoto>
                      <SpacingX small />
                      <ProductPhoto onPress={() => handleSelectPhoto(4)}>
                        {photos[4]?.uri ? (
                          <ProductPhotoImage
                            source={{
                              uri: photos[4]?.uri,
                            }}
                          />
                        ) : (
                          <SvgIcon
                            name="image"
                            width={20}
                            height={20}
                            color={colors.black}
                          />
                        )}
                      </ProductPhoto>
                      <SpacingX small />
                      <ProductPhoto onPress={() => handleSelectPhoto(5)}>
                        {photos[5]?.uri ? (
                          <ProductPhotoImage
                            source={{
                              uri: photos[5]?.uri,
                            }}
                          />
                        ) : (
                          <SvgIcon
                            name="image"
                            width={20}
                            height={20}
                            color={colors.black}
                          />
                        )}
                      </ProductPhoto>
                    </ProductPhotosContainer>

                    {photosError && <ErrorMessage>{photosError}</ErrorMessage>}
                  </>
                )}

                {progress === 2 && (
                  <Controller
                    name="productDescription"
                    defaultValue={productDescription}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur}}) => (
                      <InputLine
                        title={PageTitles.productDescription}
                        value={productDescription}
                        maxLength={500}
                        onBlur={onBlur}
                        onChangeText={e => {
                          setProductDescription(e);
                          onChange(e);
                        }}
                        error={!!errors.productDescription}
                        errorText={String(errors.productDescription?.message)}
                      />
                    )}
                  />
                )}

                {progress === 3 && (
                  <Controller
                    name="price"
                    defaultValue={price}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur}}) => (
                      <InputLine
                        title={PageTitles.price}
                        value={price}
                        keyboardType="number-pad"
                        maxLength={200}
                        onBlur={onBlur}
                        onChangeText={e => {
                          setPrice(e);
                          onChange(e);
                        }}
                        error={!!errors.price}
                        errorText={String(errors.price?.message)}
                      />
                    )}
                  />
                )}

                {progress === 4 && (
                  <>
                    <Title withPadding>{PageTitles.availability}</Title>
                    <SpacingY medium />
                    <RadioButton
                      firstSelectedValue={
                        availability
                          ? {value: 'Disponível'}
                          : {value: 'Indisponível'}
                      }
                      data={[{value: 'Disponível'}, {value: 'Indisponível'}]}
                      onSelect={(value: string) => handleAvailability(value)}
                    />
                  </>
                )}

                {progress === 5 && (
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

                {progress === 6 && (
                  <Controller
                    name="category"
                    defaultValue={category}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur}}) => (
                      <InputLine
                        title={PageTitles.category}
                        value={category}
                        keyboardType="number-pad"
                        maxLength={200}
                        onBlur={onBlur}
                        onChangeText={e => {
                          setCategory(e);
                          onChange(e);
                        }}
                        error={!!errors.category}
                        errorText={String(errors.category?.message)}
                      />
                    )}
                  />
                )}

                {progress === 7 && (
                  <Controller
                    name="store"
                    defaultValue={store}
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({field: {onChange, onBlur}}) => (
                      <InputLine
                        title={PageTitles.store}
                        value={store}
                        keyboardType="number-pad"
                        maxLength={200}
                        onBlur={onBlur}
                        onChangeText={e => {
                          setStore(e);
                          onChange(e);
                        }}
                        error={!!errors.store}
                        errorText={String(errors.store?.message)}
                      />
                    )}
                  />
                )}
              </>
            )}
          </BodyContainer>

          <ButtonsContainer>
            {isProgressEnd ? (
              <Button
                outlinedLight
                loading={isLoadingPostProduct}
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

export default CompanyRegisterProduct;
