import React, {useMemo} from 'react';

import WhatsappSvg from '../../assets/svgs/whatsapp.svg';
import FacebookSvg from '../../assets/svgs/facebook.svg';
import QrCodeSvg from '../../assets/svgs/qrCode.svg';
import InstagramSvg from '../../assets/svgs/instagram.svg';

import {Container} from './styles';
import {colors} from '../../styles/colors';

type Props = {
  type: 'whatsapp' | 'instagram' | 'facebook' | 'qrcode';
  onPress: () => void;
};
const RoundIconButton: React.FC<Props> = ({type, onPress}) => {
  const iconType = useMemo(() => {
    if (type === 'whatsapp') {
      return <WhatsappSvg style={{color: colors.indigoA200}} />;
    }
    if (type === 'instagram') {
      return <InstagramSvg style={{color: colors.indigoA200}} />;
    }
    if (type === 'facebook') {
      return <FacebookSvg style={{color: colors.indigoA200}} />;
    }
    if (type === 'qrcode') {
      return <QrCodeSvg style={{color: colors.indigoA200}} />;
    }
  }, [type]);

  return <Container onPress={onPress}>{iconType}</Container>;
};
export default RoundIconButton;
