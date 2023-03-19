import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  Platform,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BarCodeScanner, PermissionStatus} from 'expo-barcode-scanner';

import IconButton from '../IconButton';

import ServiceClient from '../../services/client/client.service';
import {ProductDetail} from '../../services/client/types';
import {formatCurrencyBRL} from '../../utils/helpers';
import {openWhatsapp} from '../../utils/deepLinks';

import {SvgIcon} from '../SvgIcon';

import {
  Overlay,
  Container,
  ProductContainer,
  ContainerIconButton,
  Name,
  Image,
  DescriptionContainer,
  Price,
  PromotionContainer,
  PromotionText,
  SoldBy,
  FeaturesScrollContainer,
  FeaturesContentContainer,
  FeaturesTitle,
  QRCodeContainer,
  QRCodeTitle,
  QRCodeImage,
  ProductScrollContainer,
  ProductContainerContents,
  WhatsAppButtonText,
  WhatsAppButton,
  WhatsAppContainer,
  FooterContainer,
  DiscountButton,
  DiscountButtonText,
  GuarantedProductContainer,
  GuarantedProductDescriptionContainer,
  GuarantedProductTitle,
  GuarantedProductDescription,
  QrCodeScannerButtonText,
  QrCodeScannerButton,
  ImageNotFound,
  QRCodeImageNotFound,
} from './styles';
import {colors} from '../../styles/colors';
import {
  BoxSkeletonLoading,
  SpacingY,
  TextsSkeletonLoading,
} from '../../styles/globalStyles';

const renderTitleLoading = () => (
  <>
    <SpacingY tiny />
    <TextsSkeletonLoading width={180} />
  </>
);
const TitleLoading = () => renderTitleLoading();

const renderImageLoading = () => (
  <>
    <SpacingY medium />
    <BoxSkeletonLoading width={160} height={160} />
    <SpacingY tiny />
  </>
);
const ImageLoading = () => renderImageLoading();

const renderDescriptionsLoading = () => (
  <>
    <TextsSkeletonLoading width={150} thin />
    <SpacingY tiny />
    <TextsSkeletonLoading width={150} thin />
    <SpacingY tiny />
    <TextsSkeletonLoading width={150} thin />
    <SpacingY tiny />
    <TextsSkeletonLoading width={150} thin />
  </>
);
const DescriptionsLoading = () => renderDescriptionsLoading();

const renderFeaturesLoading = () => (
  <>
    <SpacingY medium />
    <TextsSkeletonLoading width={240} thin />
    <SpacingY tiny />
    <TextsSkeletonLoading width={240} thin />
    <SpacingY tiny />
    <TextsSkeletonLoading width={240} thin />
    <SpacingY tiny />
    <TextsSkeletonLoading width={240} thin />
  </>
);
const FeaturesLoading = () => renderFeaturesLoading();

const renderQrCodeLoading = () => (
  <>
    <SpacingY small />
    <BoxSkeletonLoading width={100} height={100} />
    <SpacingY tiny />
  </>
);
const QrCodeLoading = () => renderQrCodeLoading();

const renderButtonsLoading = () => (
  <>
    <TextsSkeletonLoading width={120} />
    <SpacingY small />
    <TextsSkeletonLoading width={120} />
  </>
);
const ButtonsLoading = () => renderButtonsLoading();

export type ClientProductDetailModalHandlersToFather = {
  openModal: () => void;
  closeModal: () => void;
};

type Props = {
  onClose: () => void;
  product: ProductDetail | undefined;
  isLoading: boolean;
  emphasisProduct?: boolean;
};

const ClientProductDetailModal: React.ForwardRefRenderFunction<
  ClientProductDetailModalHandlersToFather,
  Props
> = ({onClose, product, isLoading, emphasisProduct}: Props, ref) => {
  const navigation = useNavigation<any>();

  const {
    postGuaranteeDiscount,
    isSuccess: isGuaranteeDiscountSuccess,
    isLoading: isGuaranteeDiscountLoading,
    isError: isGuaranteeDiscountError,
  } = ServiceClient.usePostGuaranteeDiscount();

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isGuaranteedProduct, setIsGuaranteedProduct] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState<
    | PermissionStatus.UNDETERMINED
    | PermissionStatus.GRANTED
    | PermissionStatus.DENIED
  >(PermissionStatus.UNDETERMINED);

  const openModal = useCallback(() => {
    setIsVisibleModal(true);
    setIsGuaranteedProduct(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisibleModal(false);
    setIsGuaranteedProduct(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    };
  });

  useEffect(() => {
    isGuaranteeDiscountSuccess && setIsGuaranteedProduct(true);
  }, [isGuaranteeDiscountSuccess]);

  useEffect(() => {
    isGuaranteeDiscountError &&
      Alert.alert(
        'Ocorreu algum erro ao tentar garantir o desconto!',
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
  }, [isGuaranteeDiscountError]);

  const handleGuarantedProduct = useCallback(() => {
    if (product?.id && product?.cupom) {
      postGuaranteeDiscount({
        productId: product?.id,
        cupom: product?.cupom,
      });
    }
  }, [product?.id, product?.cupom]);

  useEffect(() => {
    if (hasCameraPermission === PermissionStatus.DENIED) {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
    }

    if (hasCameraPermission === PermissionStatus.GRANTED) {
      onClose();
      navigation.navigate('QRCodeScanner', {
        productId: product?.id,
        cupomId: product?.cupom,
      });
    }
  }, [hasCameraPermission, navigation, onClose]);

  const handleScannerQRCode = useCallback(() => {
    (async () => {
      setHasCameraPermission(PermissionStatus.UNDETERMINED);

      const {status} = await BarCodeScanner.requestPermissionsAsync();

      if (status === PermissionStatus.GRANTED) {
        setHasCameraPermission(PermissionStatus.GRANTED);
      }

      if (status === PermissionStatus.DENIED) {
        setHasCameraPermission(PermissionStatus.DENIED);
      }
    })();
  }, []);

  const renderTitle = useCallback(
    () => <>{!isLoading ? <Name>{product?.name}</Name> : <TitleLoading />}</>,
    [isLoading, product?.name],
  );

  const renderImage = useCallback(
    () => (
      <>
        {!isLoading ? (
          <>
            {product?.img && product?.img.length > 0 ? (
              <Image source={{uri: product?.img}} />
            ) : (
              <ImageNotFound>
                <SvgIcon name="image" color={colors.black} />
              </ImageNotFound>
            )}
          </>
        ) : (
          <ImageLoading />
        )}
      </>
    ),
    [isLoading, product?.img],
  );

  const renderDescription = useCallback(
    () => (
      <DescriptionContainer>
        {!isLoading ? (
          <>
            <Price>{formatCurrencyBRL(product?.price)}</Price>
            <PromotionContainer>
              <PromotionText>{product?.promotion}% OFF</PromotionText>
            </PromotionContainer>
            <SoldBy>
              Vendido por <SoldBy colorful>{product?.store}</SoldBy>
            </SoldBy>
          </>
        ) : (
          <DescriptionsLoading />
        )}
      </DescriptionContainer>
    ),
    [isLoading, product?.price, product?.promotion, product?.store],
  );

  const renderFeatures = useCallback(
    () => (
      <>
        {!isLoading ? (
          <View style={{width: '100%', height: 120}}>
            <FeaturesScrollContainer>
              <FeaturesContentContainer>
                <FeaturesTitle>{product?.description}</FeaturesTitle>
              </FeaturesContentContainer>
            </FeaturesScrollContainer>
          </View>
        ) : (
          <FeaturesLoading />
        )}
      </>
    ),
    [isLoading, product?.description],
  );

  const renderQrCode = useCallback(
    () => (
      <QRCodeContainer>
        {!isLoading ? (
          <>
            <QRCodeTitle>QR Code para desconto</QRCodeTitle>
            {product?.qrCodeImg ? (
              <QRCodeImage source={{uri: product?.qrCodeImg}} />
            ) : (
              <QRCodeImageNotFound>
                <SvgIcon name="image" color={colors.black} />
              </QRCodeImageNotFound>
            )}
          </>
        ) : (
          <QrCodeLoading />
        )}
      </QRCodeContainer>
    ),
    [isLoading, product?.qrCodeImg],
  );

  const renderGuarantedProduct = () => (
    <GuarantedProductContainer>
      <GuarantedProductDescriptionContainer>
        <GuarantedProductTitle>
          PRODUTO GARANTIDO COM SUCESSO!
        </GuarantedProductTitle>
        <GuarantedProductDescription>
          Você terá 48 horas para efetuar a retirada do produto na loja
          escolhida. Caso contrário a promoção será removida.
        </GuarantedProductDescription>
      </GuarantedProductDescriptionContainer>

      <SpacingY medium />

      <View style={{paddingHorizontal: 30}}>
        <WhatsAppButton
          onPress={() => openWhatsapp({phone: product?.loja_whatsapp})}>
          <SvgIcon
            name="whatsapp"
            width={15}
            height={15}
            color={colors.white}
          />
          <WhatsAppButtonText>ACESSE O WHATSAPP DA LOJA</WhatsAppButtonText>
        </WhatsAppButton>
      </View>
    </GuarantedProductContainer>
  );

  const renderButtons = useCallback(
    () => (
      <WhatsAppContainer>
        {!isLoading ? (
          <>
            <WhatsAppButton
              onPress={() => openWhatsapp({phone: product?.loja_whatsapp})}>
              <SvgIcon
                name="whatsapp"
                width={15}
                height={15}
                color={colors.white}
              />
              <WhatsAppButtonText>ACESSE O WHATSAPP</WhatsAppButtonText>
            </WhatsAppButton>

            <DiscountButton onPress={handleGuarantedProduct}>
              <SvgIcon
                name="circleCheck"
                width={15}
                height={15}
                color={colors.white}
              />
              {isGuaranteeDiscountLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <DiscountButtonText>GARANTIR DESCONTO</DiscountButtonText>
              )}
            </DiscountButton>

            <QrCodeScannerButton onPress={handleScannerQRCode}>
              <SvgIcon
                name="qrCode"
                width={15}
                height={15}
                color={colors.black}
              />
              <QrCodeScannerButtonText>
                ESCANEAR QR CODE
              </QrCodeScannerButtonText>
            </QrCodeScannerButton>
          </>
        ) : (
          <ButtonsLoading />
        )}
      </WhatsAppContainer>
    ),
    [isLoading],
  );

  const renderWhatsAppButton = () => (
    <View style={{paddingTop: 30}}>
      <WhatsAppButton onPress={() => openWhatsapp({phone: product?.whatsApp})}>
        <SvgIcon name="whatsapp" width={15} height={15} color={colors.white} />
        <WhatsAppButtonText>ACESSE O WHATSAPP</WhatsAppButtonText>
      </WhatsAppButton>
    </View>
  );

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisibleModal}
      style={{position: 'relative'}}>
      <Overlay />
      <Container>
        <ProductContainer>
          <ContainerIconButton>
            <IconButton
              name="close"
              color={colors.indigoA200}
              width={30}
              height={30}
              onPress={onClose}
            />
          </ContainerIconButton>

          <ProductScrollContainer>
            <ProductContainerContents>
              {renderTitle()}
              {renderImage()}
              {renderDescription()}

              {!isGuaranteedProduct && (
                <>
                  {renderFeatures()}

                  <FooterContainer>
                    <>
                      {emphasisProduct ? (
                        <>
                          {renderQrCode()}
                          {renderButtons()}
                        </>
                      ) : (
                        <>{renderWhatsAppButton()}</>
                      )}
                    </>
                  </FooterContainer>
                </>
              )}

              {isGuaranteedProduct && <>{renderGuarantedProduct()}</>}
            </ProductContainerContents>
          </ProductScrollContainer>
        </ProductContainer>
      </Container>
    </Modal>
  );
};

const ForwardRefClientProductDetailModal = forwardRef(ClientProductDetailModal);
export default memo(ForwardRefClientProductDetailModal);
