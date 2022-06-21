import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { Modal, View } from 'react-native';

import {
    Overlay,
    Container,
    ProductContainer,
    ContainerIconButton,
    Name, 
    Image,
    DescriptionContainer, 
    Price, Installment, 
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
  } from './styles';
  
  import IconButton from '../IconButton';
  
  export type ProductDetailModalHandlersToFather = {
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
}
  
  type Props = {
    onClose: () => void;
    product: Product | undefined;
  };

  const features = ['Marca: LG', 'Modelo - modelo', 'Marca2: LG', 'Modelo2 - modelo', 'Marca3: LG', 'Modelo3 - modelo']
  
  const ProductDetailModal: React.ForwardRefRenderFunction<ProductDetailModalHandlersToFather, Props> = (
    {
      onClose,
      product
    }: Props,
    ref,
  ) => {  
    const [isVisibleModal, setIsVisibleModal] = useState(false);
  
    const openModal = useCallback(() => {
      setIsVisibleModal(true);
    }, []);
  
    const closeModal = useCallback(() => {
      setIsVisibleModal(false);
    }, []);
  
    useImperativeHandle(ref, () => {
      return {
        openModal,
        closeModal,
      };
    });
  
    return (
        <Modal
            transparent
            animationType="fade"
            visible={isVisibleModal}
            style={{ position: 'relative' }}
        >
            <Overlay />
            <Container>
            <ProductContainer>
              <ContainerIconButton>
                  <IconButton icon="x" size={24} onPress={onClose} />
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
                  <SoldBy>{product?.soldBy}</SoldBy>
                </DescriptionContainer>

                <View style={{ width: '100%', height: 120 }}>
                  <FeaturesScrollContainer>
                    <FeaturesContentContainer>
                      <FeaturesTitle>Características:</FeaturesTitle>
                      {features.map((item) => (
                        <FeatureItem key={item}>{item}</FeatureItem>
                      ))}
                      <FeaturesTitle>Especificações:</FeaturesTitle>
                      {features.map((item) => (
                        <FeatureItem key={item}>{item}</FeatureItem>
                        ))}
                    </FeaturesContentContainer>
                  </FeaturesScrollContainer>
                </View>

                <QRCodeContainer>
                  <QRCodeTitle>QR Code para desconto</QRCodeTitle>
                  <QRCodeImage source={{uri: product?.qrCodeImg}} />
                </QRCodeContainer>
                </ProductContainerContents>
            </ProductScrollContainer>
            </ProductContainer>
            </Container>
        </Modal>
    );
  };
  
  const ForwardRefProductDetailModal = forwardRef(ProductDetailModal);
  export default memo(ForwardRefProductDetailModal);
  