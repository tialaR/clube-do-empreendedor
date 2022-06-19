import React, { ReactNode } from 'react';

import { Title } from './styles';

type Props = {
    children: ReactNode;
}

const SectionTitle: React.FC<Props> = ({ children }) => {
  return (
        <Title>{children}</Title>
  );
}

export default SectionTitle;