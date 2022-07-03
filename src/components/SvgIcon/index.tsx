import React, {ReactElement, useMemo} from 'react';
import {SvgProps} from 'react-native-svg';

import WhatsappSvg from '../../assets/svgs/whatsapp.svg';
import CircleCheckSvg from '../../assets/svgs/circleCheck.svg';
import HomeOutlineSvg from '../../assets/svgs/homeOutline.svg';
import UserCircleSvg from '../../assets/svgs/userCircle.svg';
import NotificationOutlineSvg from '../../assets/svgs/notificationOutline.svg';
import NotificationDeactivatedSvg from '../../assets/svgs/notificationDeactivated.svg';
import CaretDownSvg from '../../assets/svgs/caretDown.svg';
import CaretUpSvg from '../../assets/svgs/caretUp.svg';
import ChevronLeftSvg from '../../assets/svgs/chevronLeft.svg';
import ImageSvg from '../../assets/svgs/image.svg';
import LocationSvg from '../../assets/svgs/location.svg';
import CheckedSquareSvg from '../../assets/svgs/checkedSquare.svg';
import CupomSvg from '../../assets/svgs/cupom.svg';
import DiscountSvg from '../../assets/svgs/discount.svg';
import FacebookSvg from '../../assets/svgs/facebook.svg';
import InstagramSvg from '../../assets/svgs/instagram.svg';
import QrCodeSvg from '../../assets/svgs/qrCode.svg';
import SearchSvg from '../../assets/svgs/search.svg';

interface Props extends SvgProps {
  name:
    | 'whatsapp'
    | 'circleCheck'
    | 'homeOutline'
    | 'userCircle'
    | 'notificationOutline'
    | 'notificationDeactivated'
    | 'caretDown'
    | 'caretUp'
    | 'chevronLeft'
    | 'image'
    | 'location'
    | 'checkedSquare'
    | 'cupom'
    | 'discount'
    | 'facebook'
    | 'instagram'
    | 'qrCode'
    | 'search';
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

    if (name === 'userCircle') {
      return <UserCircleSvg {...rest} />;
    }

    if (name === 'notificationOutline') {
      return <NotificationOutlineSvg {...rest} />;
    }

    if (name === 'notificationDeactivated') {
      return <NotificationDeactivatedSvg {...rest} />;
    }

    if (name === 'caretDown') {
      return <CaretDownSvg {...rest} />;
    }

    if (name === 'caretUp') {
      return <CaretUpSvg {...rest} />;
    }

    if (name === 'chevronLeft') {
      return <ChevronLeftSvg {...rest} />;
    }

    if (name === 'image') {
      return <ImageSvg {...rest} />;
    }

    if (name === 'location') {
      return <LocationSvg {...rest} />;
    }

    if (name === 'checkedSquare') {
      return <CheckedSquareSvg {...rest} />;
    }

    if (name === 'cupom') {
      return <CupomSvg {...rest} />;
    }

    if (name === 'discount') {
      return <DiscountSvg {...rest} />;
    }

    if (name === 'facebook') {
      return <FacebookSvg {...rest} />;
    }

    if (name === 'instagram') {
      return <InstagramSvg {...rest} />;
    }

    if (name === 'qrCode') {
      return <QrCodeSvg {...rest} />;
    }

    if (name === 'search') {
      return <SearchSvg {...rest} />;
    }
  }, [name, rest]);

  return <>{icon}</>;
};

export {SvgIcon};
