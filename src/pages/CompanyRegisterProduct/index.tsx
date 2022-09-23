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

import {
  formatCommaToDot,
  formatCurrencyBRL,
  formatDotToComma,
} from '../../utils/helpers';

import {colors} from '../../styles/colors';
import {SpacingY} from '../../styles/globalStyles';
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
  ErrorContainer,
} from './styles';
import {
  Coupon,
  RegisteredProduct,
  RegisterProduct,
} from '../../services/company/types';

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

type DiscountCode = {
  id: number | null | undefined;
  label: string | null | undefined;
  value: string | null | undefined;
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
  .object()

  .shape({
    uri: yup.string().required('Uma foto do produto deve ser adicionada.'),
    type: yup.string(),
    name: yup.string(),
  });

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
    isLoading: isPostProductLoading,
    isError: isPostProductError,
    response: productRegistered,
  } = ServiceCompany.usePostProduct();

  const {response: couponsList} = ServiceCompany.useGetCoupons();

  const discountCodesList = useMemo(() => {
    if (couponsList && couponsList?.length > 0) {
      return couponsList?.map((item: Coupon) => {
        return {
          id: item.id,
          label: item.discount,
          value: item.discount,
        };
      });
    } else {
      return [];
    }
  }, [couponsList]);

  const [progress, setProgress] = useState(0);

  const [productName, setProductName] = useState('');
  const [photo, setPhoto] = useState<Photo>({} as Photo);
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(false);
  const [store, setStore] = useState('');
  const [category, setCategory] = useState('');
  const [selectedDiscountCode, setSelectedDiscountCode] =
    useState<DiscountCode>({
      id: 0,
      label: 'Selecione um códido',
      value: undefined,
    });

  const [productResgistered, setProductResgistered] = useState<
    RegisteredProduct | undefined
  >();

  const [discountCodeError, setDiscountCodeError] = useState<
    string | undefined
  >(undefined);
  const [photoError, setPhotoError] = useState<string | undefined>(undefined);

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
  const isSelectedPhoto = useMemo(() => photo?.uri, [photo]);

  useEffect(() => {
    if (couponsList && couponsList?.length <= 0) {
      Alert.alert(
        'Não existem cupons cadastrados!',
        'Para realizar o cadastro de produtos pelo menos um cupom deve ser cadastrado.',
        [
          {
            text: 'Ok',
            onPress: () => navigation?.goBack(),
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => navigation?.goBack(),
        },
      );
    }
  }, [couponsList]);

  useEffect(() => {
    isPostProductError &&
      Alert.alert(
        'Ocorreu algum erro ao tentar cadastrar o produto!',
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
  }, [isPostProductError]);

  useEffect(() => {
    if (progress === 2) {
      productPhotosValidationSchema.validate(photo).catch(err => {
        setPhotoError(err.errors[0]);
      });
    }

    if (progress === 6) {
      discountCodeValidationSchema.validate(selectedDiscountCode).catch(err => {
        setDiscountCodeError(err.errors[0]);
      });
    }
  }, [progress, photo, selectedDiscountCode]);

  useEffect(() => {
    setDiscountCodeError(undefined);
  }, [isSelectedDiscountCode]);

  useEffect(() => {
    setPhotoError(undefined);
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
    const productUpdated: RegisterProduct = {
      name: data?.productName,
      description: data?.productDescription,
      price: formatCommaToDot(data?.price),
      availability: availability,
      category: data?.category,
      cupom: String(selectedDiscountCode?.id),
      image: photo,
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
        price: productRegistered?.price,
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

  const handleSelectPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response: ImagePickerResponse) => {
        if (response && response?.assets?.[0].uri) {
          const image = {
            uri: response?.assets?.[0].uri,
            type: response?.assets?.[0].type,
            name: response?.assets?.[0].fileName,
          };

          setPhoto(image);
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
                      <ProductPhoto onPress={handleSelectPhoto}>
                        {photo?.uri ? (
                          <ProductPhotoImage
                            source={{
                              uri: photo?.uri,
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
                    {photoError && (
                      <ErrorContainer>
                        <ErrorMessage>{photoError}</ErrorMessage>
                      </ErrorContainer>
                    )}
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
                          setPrice(formatDotToComma(e));
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
                      list={discountCodesList}
                      onItemSelect={(item: DiscountCode) =>
                        setSelectedDiscountCode(item)
                      }
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
                loading={isPostProductLoading}
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
