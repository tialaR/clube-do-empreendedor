import React, {useMemo} from 'react';

import {
  BoxSkeletonLoading,
  SpacingY,
  TextsSkeletonLoading,
} from '../../styles/globalStyles';
import {
  Container,
  ProductContainer,
  Name,
  Image,
  DescriptionContainer,
  Price,
  Installment,
  PromotionContainer,
  PromotionText,
  SoldBy,
  QRCodeContainer,
  QRCodeTitle,
  QRCodeImage,
  ProductContainerContents,
  FooterContainer,
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

export type Product = {
  id: string;
  name: string;
  img: string;
  price: string;
  installment: string;
  promotion: string;
  soldBy: string;
  qrCodeImg: string;
};

type Props = {
  product: Product;
};

const CompanyProductDetail: React.FC<Props> = ({product}) => {
  const isDescriptionLoaded = useMemo(
    () =>
      product?.price ||
      product?.installment ||
      product?.promotion ||
      product?.soldBy,
    [product],
  );

  return (
    <Container>
      <ProductContainer>
        <ProductContainerContents>
          {product?.name ? <Name>{product?.name}</Name> : <TitleLoading />}

          {product?.img ? (
            <Image source={{uri: product?.img}} />
          ) : (
            <ImageLoading />
          )}

          <DescriptionContainer>
            {isDescriptionLoaded ? (
              <>
                <Price>{product?.price}</Price>
                <Installment>{product?.installment}</Installment>
                <PromotionContainer>
                  <PromotionText>{product?.promotion}</PromotionText>
                </PromotionContainer>
                <SoldBy>
                  {'Vendido por\n'}
                  <SoldBy>{product?.soldBy}</SoldBy>
                </SoldBy>
              </>
            ) : (
              <DescriptionsLoading />
            )}
          </DescriptionContainer>

          <FooterContainer>
            <QRCodeContainer>
              {product?.qrCodeImg ? (
                <>
                  <QRCodeTitle>QR Code para desconto</QRCodeTitle>
                  <QRCodeImage source={{uri: product?.qrCodeImg}} />
                </>
              ) : (
                <QrCodeLoading />
              )}
            </QRCodeContainer>
          </FooterContainer>
        </ProductContainerContents>
      </ProductContainer>
    </Container>
  );
};

export default CompanyProductDetail;
