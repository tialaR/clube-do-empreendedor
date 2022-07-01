import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Container} from './styles';
import {colors} from '../../styles/colors';

interface Props {
  icon: string;
  size?: number;
  color?: string;
  roundLight?: boolean;
  onPress: () => void;
}

const IconButton: React.FC<Props> = ({
  icon,
  size = 30,
  color = colors.indigoA200,
  roundLight = false,
  onPress,
}) => {
  if (roundLight) {
    return (
      <Container onPress={onPress} roundLight>
        <Icon name={icon} size={size} color={colors.indigoA200} />
      </Container>
    );
  }

  return (
    <Container onPress={onPress}>
      <Icon name={icon} size={size} color={color} />
    </Container>
  );
};

export default IconButton;
