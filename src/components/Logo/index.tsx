import React from 'react';

import logoImg from  '../../assets/logo.png';

import { Container, LogoImg, Title } from './styles';

const Logo: React.FC = () => {
  return (
      <Container>
          <LogoImg source={logoImg} />
          <Title>CLUBE DO <Title bold>{`\nEMPREENDEDOR`}</Title></Title>
      </Container>
  );
}

export default Logo;