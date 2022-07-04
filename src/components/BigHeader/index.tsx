import React from 'react';

import IconButton from '../IconButton';
import Logo from '../Logo';

import {colors} from '../../styles/colors';
import {Container, BackButtonContainer} from './styles';

type Props = {
  showBackButton?: boolean;
  onBackButtonPress?: () => void;
};

const BigHeader: React.FC<Props> = ({
  showBackButton,
  onBackButtonPress = () => false,
}) => {
  return (
    <Container>
      <Logo />

      {showBackButton && (
        <BackButtonContainer>
          <IconButton
            name="back"
            color={colors.white}
            width={30}
            height={30}
            onPress={onBackButtonPress}
          />
        </BackButtonContainer>
      )}
    </Container>
  );
};

export default BigHeader;
