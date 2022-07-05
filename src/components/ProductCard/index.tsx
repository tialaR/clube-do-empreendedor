import React, {memo, useMemo} from 'react';

import {
  BoxSkeletonLoading,
  SpacingY,
  TextsSkeletonLoading,
} from '../../styles/globalStyles';
import {
  ColorfulContainer,
  Container,
  Image,
  NameContainer,
  Name,
  DescriptionContainer,
  Price,
  Installment,
  PromotionContainer,
  PromotionText,
  SoldBy,
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
  name: string;
  img: string;
  price: string;
  installment: string;
  promotion: string;
  soldBy: string;
  emphasis?: boolean;
  onPress: () => void;
};

const ProductCard: React.FC<Props> = ({
  name,
  img,
  price,
  installment,
  promotion,
  soldBy,
  emphasis,
  onPress,
}) => {
  const isDescriptionsLoaded = useMemo(
    () => name || price || installment || promotion || soldBy,
    [name, price, installment, promotion, soldBy],
  );

  return (
    <ColorfulContainer emphasis={emphasis} onPress={onPress}>
      <Container>
        {img ? <Image source={{uri: img}} /> : <ImageLoading />}

        <DescriptionContainer>
          {isDescriptionsLoaded ? (
            <>
              <NameContainer>
                <Name numberOfLines={2} ellipsizeMode="tail">
                  {name}
                </Name>
              </NameContainer>
              <Price>{price}</Price>
              <Installment>{installment}</Installment>
              <PromotionContainer>
                <PromotionText>{promotion}</PromotionText>
              </PromotionContainer>
              <SoldBy>Vendido por {soldBy}</SoldBy>
            </>
          ) : (
            <DewscriptionsLoading />
          )}
        </DescriptionContainer>
      </Container>
    </ColorfulContainer>
  );
};

export default memo(ProductCard);
