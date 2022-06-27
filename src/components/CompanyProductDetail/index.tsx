import React from 'react';

import {
    Container,
    ProductContainer,
    Name, 
    Image,
    DescriptionContainer, 
    Price, Installment, 
    PromotionContainer, 
    PromotionText, 
    SoldBy,
    QRCodeContainer,
    QRCodeTitle,
    QRCodeImage,
    ProductContainerContents,
    FooterContainer
  } from './styles';


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
    product: Product;
  };
  
  const CompanyProductDetail: React.FC<Props> = ({ product }) => {  
  
    return (
            <Container>
            <ProductContainer>
                <ProductContainerContents>
                    <Name>{product?.name}</Name>
                    <Image source={{uri: product?.img}} />

                    <DescriptionContainer>
                      <Price>{product?.price}</Price>
                      <Installment>{product?.installment}</Installment>
                      <PromotionContainer>
                        <PromotionText>{product?.promotion}</PromotionText>
                      </PromotionContainer>
                      <SoldBy>{'Vendido por\n'}<SoldBy>{product?.soldBy}</SoldBy></SoldBy>
                    </DescriptionContainer>

                      <FooterContainer>
                        <QRCodeContainer>
                          <QRCodeTitle>QR Code para desconto</QRCodeTitle>
                          <QRCodeImage source={{uri: product?.qrCodeImg}} />
                        </QRCodeContainer>
                      </FooterContainer>
                </ProductContainerContents>
            </ProductContainer>
            </Container>
    );
  };
  
export default CompanyProductDetail;
  