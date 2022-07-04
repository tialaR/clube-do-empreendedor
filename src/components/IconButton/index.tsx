import React, {useMemo} from 'react';
import {SvgProps} from 'react-native-svg';

import {Container} from './styles';

import CloseSvg from '../../assets/svgs/close.svg';
import ChevronLeftSvg from '../../assets/svgs/chevronLeft.svg';

interface Props extends SvgProps {
  name: 'close' | 'back';
  size?: number;
  color?: string;
  onPress: () => void;
}

const IconButton: React.FC<Props> = ({name, onPress, ...rest}) => {
  const iconSvg = useMemo(() => {
    if (name === 'close') {
      return <CloseSvg {...rest} />;
    }

    if (name === 'back') {
      return <ChevronLeftSvg {...rest} />;
    }
  }, [name, rest]);

  return <Container onPress={onPress}>{iconSvg}</Container>;
};

export default IconButton;
