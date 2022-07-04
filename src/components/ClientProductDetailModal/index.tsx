import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, View} from 'react-native';

import IconButton from '../IconButton';

import {
  Overlay,
  Container,
  ProductContainer,
  ContainerIconButton,
  Name,
  Image,
  DescriptionContainer,
  Price,
  Installment,
  PromotionContainer,
  PromotionText,
  SoldBy,
  FeaturesScrollContainer,
  FeaturesContentContainer,
  FeaturesTitle,
  FeatureItem,
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
} from './styles';
import {colors} from '../../styles/colors';
import {SpacingY} from '../../styles/globalStyles';
import {SvgIcon} from '../SvgIcon';

export type ClientProductDetailModalHandlersToFather = {
  openModal: () => void;
  closeModal: () => void;
};

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
  onClose: () => void;
  product: Product | undefined;
  emphasisProduct?: boolean;
};

const features = [
  'Marca: LG',
  'Modelo - modelo',
  'Marca2: LG',
  'Modelo2 - modelo',
  'Marca3: LG',
  'Modelo3 - modelo',
];

const ClientProductDetailModal: React.ForwardRefRenderFunction<
  ClientProductDetailModalHandlersToFather,
  Props
> = ({onClose, product, emphasisProduct}: Props, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isGuaranteedProduct, setIsGuaranteedProduct] = useState(false);

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

  const handleGuarantedProduct = () => {
    setIsGuaranteedProduct(true);
  };

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
              <Name>{product?.name}</Name>
              <Image source={{uri: product?.img}} />

              <DescriptionContainer>
                <Price>{product?.price}</Price>
                <Installment>{product?.installment}</Installment>
                <PromotionContainer>
                  <PromotionText>{product?.promotion}</PromotionText>
                </PromotionContainer>
                <SoldBy>
                  Vendido por <SoldBy colorful>{product?.soldBy}</SoldBy>
                </SoldBy>
              </DescriptionContainer>

              {!isGuaranteedProduct && (
                <>
                  <View style={{width: '100%', height: 120}}>
                    <FeaturesScrollContainer>
                      <FeaturesContentContainer>
                        <FeaturesTitle>Características:</FeaturesTitle>
                        {features.map(item => (
                          <FeatureItem key={item}>{item}</FeatureItem>
                        ))}
                      </FeaturesContentContainer>
                      <FeaturesContentContainer>
                        <FeaturesTitle>Especificações:</FeaturesTitle>
                        {features.map(item => (
                          <FeatureItem key={item}>{item}</FeatureItem>
                        ))}
                      </FeaturesContentContainer>
                    </FeaturesScrollContainer>
                  </View>

                  <FooterContainer>
                    <QRCodeContainer>
                      <QRCodeTitle>QR Code para desconto</QRCodeTitle>
                      <QRCodeImage source={{uri: product?.qrCodeImg}} />
                    </QRCodeContainer>
                    <WhatsAppContainer>
                      <WhatsAppButton onPress={() => false}>
                        <SvgIcon
                          name="whatsapp"
                          width={15}
                          height={15}
                          color={colors.white}
                        />
                        <WhatsAppButtonText>
                          ACESSE O WHATSAPP
                        </WhatsAppButtonText>
                      </WhatsAppButton>

                      {emphasisProduct && (
                        <DiscountButton onPress={handleGuarantedProduct}>
                          <SvgIcon
                            name="circleCheck"
                            width={15}
                            height={15}
                            color={colors.white}
                          />
                          <DiscountButtonText>
                            GARANTIR DESCONTO
                          </DiscountButtonText>
                        </DiscountButton>
                      )}
                    </WhatsAppContainer>
                  </FooterContainer>
                </>
              )}

              {isGuaranteedProduct && (
                <GuarantedProductContainer>
                  <GuarantedProductDescriptionContainer>
                    <GuarantedProductTitle>
                      PRODUTO GARANTIDO COM SUCESSO!
                    </GuarantedProductTitle>
                    <GuarantedProductDescription>
                      Você terá 48 horas para efetuar a retirada do produto na
                      loja escolhida. Caso contrário a promoção será removida.
                    </GuarantedProductDescription>
                  </GuarantedProductDescriptionContainer>

                  <SpacingY medium />

                  <View style={{paddingHorizontal: 30}}>
                    <WhatsAppButton onPress={() => false}>
                      <SvgIcon
                        name="whatsapp"
                        width={15}
                        height={15}
                        color={colors.white}
                      />
                      <WhatsAppButtonText>
                        ACESSE O WHATSAPP DA LOJA
                      </WhatsAppButtonText>
                    </WhatsAppButton>
                  </View>
                </GuarantedProductContainer>
              )}
            </ProductContainerContents>
          </ProductScrollContainer>
        </ProductContainer>
      </Container>
    </Modal>
  );
};

const ForwardRefClientProductDetailModal = forwardRef(ClientProductDetailModal);
export default memo(ForwardRefClientProductDetailModal);
