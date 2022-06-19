import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Container } from './styles';
import { colors } from '../../styles/colors';

interface Props {
  icon: string;
  onPress: () => void;
  size?: number;
  color?: string;
}

const IconButton: React.FC<Props> = ({
  icon,
  size = 30,
  color = colors.primary,
  onPress,
}) => {
  return (
    <Container onPress={onPress}>
      <Icon name={icon} size={size} color={color} />
    </Container>
  );
};

export default IconButton;