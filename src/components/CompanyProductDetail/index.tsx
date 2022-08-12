import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {RegisteredProduct} from '../../services/company/types';
import {formatCurrencyBRL} from '../../utils/helpers';

import {colors} from '../../styles/colors';
import {
  BoxSkeletonLoading,
  SpacingY,
  TextsSkeletonLoading,
} from '../../styles/globalStyles';
import {SvgIcon} from '../SvgIcon';
import {
  Container,
  ProductContainer,
  Name,
  Image,
  DescriptionContainer,
  Price,
  PromotionContainer,
  PromotionText,
  SoldBy,
  QRCodeContainer,
  QRCodeTitle,
  QRCodeImage,
  ProductContainerContents,
  FooterContainer,
  ImageNotFound,
  QRCodeImageNotFound,
} from './styles';

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

const renderQrCodeLoading = () => (
  <>
    <SpacingY small />
    <BoxSkeletonLoading width={80} height={80} />
    <SpacingY tiny />
  </>
);
const QrCodeLoading = () => renderQrCodeLoading();

type Props = {
  product: RegisteredProduct | undefined;
  isLoading?: boolean;
  isError?: boolean;
};

const CompanyProductDetail: React.FC<Props> = ({
  product,
  isLoading = false,
  isError = false,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    isError &&
      Alert.alert(
        'Ocorreu algum erro ao mostrar o detalhe do produto!',
        'Tente novamente mais tarde.',
        [
          {
            text: 'Ok',
            onPress: () => navigation.goBack(),
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => navigation.goBack(),
        },
      );
  }, [isError]);

  return (
    <Container>
      <ProductContainer>
        <ProductContainerContents>
          {isLoading ? <TitleLoading /> : <Name>{product?.name}</Name>}

          {isLoading ? (
            <ImageLoading />
          ) : (
            <>
              {product?.img && product.img.length > 0 ? (
                <Image source={{uri: product?.img}} />
              ) : (
                <ImageNotFound>
                  <SvgIcon name="image" color={colors.black} />
                </ImageNotFound>
              )}
            </>
          )}

          <DescriptionContainer>
            {isLoading ? (
              <DescriptionsLoading />
            ) : (
              <>
                <Price>{formatCurrencyBRL(product?.price)}</Price>
                <PromotionContainer>
                  <PromotionText>{product?.promotion}% OFF</PromotionText>
                </PromotionContainer>
                <SoldBy>
                  {'Vendido por\n'}
                  <SoldBy>{product?.store}</SoldBy>
                </SoldBy>
              </>
            )}
          </DescriptionContainer>

          <FooterContainer>
            <QRCodeContainer>
              {isLoading ? (
                <QrCodeLoading />
              ) : (
                <>
                  {product?.qrCodeImg && product?.qrCodeImg?.length > 0 ? (
                    <>
                      <QRCodeTitle>QR Code para desconto</QRCodeTitle>
                      <QRCodeImage source={{uri: product?.qrCodeImg}} />
                    </>
                  ) : (
                    <QRCodeImageNotFound>
                      <SvgIcon name="image" color={colors.black} />
                    </QRCodeImageNotFound>
                  )}
                </>
              )}
            </QRCodeContainer>
          </FooterContainer>
        </ProductContainerContents>
      </ProductContainer>
    </Container>
  );
};

export default CompanyProductDetail;
