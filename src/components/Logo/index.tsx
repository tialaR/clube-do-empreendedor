import React from 'react';

import logoImg from '../../assets/logo.png';

import {Container, LogoImg} from './styles';

const Logo: React.FC = () => {
  return (
    <Container>
      <LogoImg source={logoImg} />
    </Container>
  );
};

export default Logo;
