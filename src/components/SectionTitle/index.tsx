import React, {ReactNode} from 'react';

import {LoadingPrimary} from '../../styles/globalStyles';
import {Title, Container, LoadingContainer} from './styles';

type Props = {
  children: ReactNode;
  isLoading?: boolean;
};

const SectionTitle: React.FC<Props> = ({children, isLoading = false}) => {
  return (
    <Container>
      <Title>{children}</Title>
      {isLoading && (
        <LoadingContainer>
          <LoadingPrimary />
        </LoadingContainer>
      )}
    </Container>
  );
};

export default SectionTitle;
