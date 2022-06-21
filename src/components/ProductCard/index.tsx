import React, { memo } from 'react';
import { ColorfulContainer, Container, Image, NameContainer, Name, DescriptionContainer, Price, Installment, PromotionContainer, PromotionText, SoldBy } from './styles';

type Props = {
    name: string;
    img: string;
    price: string;
    installment: string;
    promotion: string;
    soldBy: string;
    emphasis?: boolean;
    onPress: () => void;
}

const ProductCard: React.FC<Props> = ({ name, img, price, installment, promotion, soldBy, emphasis, onPress }) => {
  return (
    <ColorfulContainer emphasis={emphasis} onPress={onPress}>
      <Container>
          <Image source={{uri: img}} />

          <DescriptionContainer>
            <NameContainer>
              <Name numberOfLines={2} ellipsizeMode='tail'>{name}</Name>
            </NameContainer>
            <Price>{price}</Price>
            <Installment>{installment}</Installment>
            <PromotionContainer>
              <PromotionText>{promotion}</PromotionText>
            </PromotionContainer>
            <SoldBy>{soldBy}</SoldBy>
          </DescriptionContainer>
      </Container>
    </ColorfulContainer>
  );
}

export default memo(ProductCard);