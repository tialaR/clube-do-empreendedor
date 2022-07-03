import React, {ReactElement, useMemo} from 'react';
import {SvgProps} from 'react-native-svg';

import WhatsappSvg from '../../assets/svgs/whatsapp.svg';
import CircleCheckSvg from '../../assets/svgs/circleCheck.svg';
import HomeOutlineSvg from '../../assets/svgs/homeOutline.svg';

interface Props extends SvgProps {
  name: 'whatsapp' | 'circleCheck' | 'homeOutline';
}
const SvgIcon: React.FC<Props> = ({name, ...rest}) => {
  const icon = useMemo((): ReactElement | undefined => {
    if (name === 'whatsapp') {
      return <WhatsappSvg {...rest} />;
    }

    if (name === 'circleCheck') {
      return <CircleCheckSvg {...rest} />;
    }

    if (name === 'homeOutline') {
      return <HomeOutlineSvg {...rest} />;
    }
  }, [name, rest]);

  return <>{icon}</>;
};

export {SvgIcon};
