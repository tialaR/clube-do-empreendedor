import React, {memo, useCallback} from 'react';
import {colors} from '../../styles/colors';

import {
  BoxSkeletonLoading,
  SpacingY,
  TextsSkeletonLoading,
} from '../../styles/globalStyles';
import {SvgIcon} from '../SvgIcon';
import {
  ColorfulContainer,
  Container,
  Image,
  NameContainer,
  Name,
  DescriptionContainer,
  Price,
  PromotionContainer,
  PromotionText,
  SoldBy,
  ImageNotFound,
} from './styles';

const renderImageLoading = () => (
  <BoxSkeletonLoading width={100} height={100} />
);
const ImageLoading = () => renderImageLoading();

const renderDescriptionsLoading = () => (
  <>
    <TextsSkeletonLoading width={90} />
    <SpacingY small />
    <TextsSkeletonLoading width={150} thin />
    <SpacingY tiny />
    <TextsSkeletonLoading width={150} thin />
    <SpacingY tiny />
    <TextsSkeletonLoading width={150} thin />
  </>
);
const DewscriptionsLoading = () => renderDescriptionsLoading();

type Props = {
  loading?: boolean;
  name: string | null | undefined;
  img: string | null | undefined;
  price: string | null | undefined;
  promotion: string | null | undefined;
  store: string | null | undefined;
  emphasis?: boolean | null | undefined;
  onPress: () => void;
};

const ProductCard: React.FC<Props> = ({
  loading = false,
  name,
  img,
  price,
  promotion,
  store,
  emphasis,
  onPress,
}) => {
  const renderImage = useCallback(
    () => (
      <>
        {loading ? (
          <ImageLoading />
        ) : (
          <>
            {img && img?.length > 0 ? (
              <Image source={{uri: img}} />
            ) : (
              <ImageNotFound>
                <SvgIcon name="image" color={colors.black} />
              </ImageNotFound>
            )}
          </>
        )}
      </>
    ),
    [img, loading],
  );

  return (
    <ColorfulContainer emphasis={emphasis} onPress={onPress}>
      <Container>
        {renderImage()}

        <DescriptionContainer>
          {loading ? (
            <DewscriptionsLoading />
          ) : (
            <>
              <NameContainer>
                <Name numberOfLines={2} ellipsizeMode="tail">
                  {name}
                </Name>
              </NameContainer>
              <Price>{price}</Price>
              <PromotionContainer>
                <PromotionText>{promotion}% OFF</PromotionText>
              </PromotionContainer>
              <SoldBy>Vendido por {store}</SoldBy>
            </>
          )}
        </DescriptionContainer>
      </Container>
    </ColorfulContainer>
  );
};

export default memo(ProductCard);
