import React from 'react';

import { Container, Title } from './styles';

type Props = {
    text: string;
}

const DividerContainerWithText: React.FC<Props> = ({ text }) => {
  return (
      <Container>
          <Title>{text}</Title>
      </Container>
  );
}

export default DividerContainerWithText;