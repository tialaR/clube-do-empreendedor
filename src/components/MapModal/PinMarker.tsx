import React from 'react';
import {Callout, Marker} from 'react-native-maps';

import {SvgIcon} from '../SvgIcon';

import {colors} from '../../styles/colors';
import {SpacingY} from '../../styles/globalStyles';
import {
  PinContainer,
  PinDescription,
  PinMoreInfoContainer,
  PinThinDescription,
  PinTitle,
} from './styles';

type Props = {
  id: string;
  name: string;
  address: string;
  description: string;
  openingTime: string;
  closingTime: string;
  coords: {
    latitude: number;
    longitude: number;
  };
};

const Pin: React.FC<Props> = ({
  id,
  name,
  address,
  description,
  openingTime,
  closingTime,
  coords,
}) => {
  return (
    <Marker
      key={id}
      tracksViewChanges={false}
      title={name}
      description={description}
      coordinate={coords}
      anchor={{x: 0.5, y: 0.5}}
      pinColor={colors.indigoA200}>
      <PinContainer>
        <PinTitle colorful>{name}</PinTitle>
        <SvgIcon
          name="location"
          width={40}
          height={40}
          color={colors.indigoA200}
        />
      </PinContainer>
      <Callout tooltip>
        <PinMoreInfoContainer>
          <PinTitle>{name}</PinTitle>
          <SpacingY small />
          <PinDescription>{address}</PinDescription>
          <PinDescription>{description}</PinDescription>
          <PinThinDescription>{openingTime}</PinThinDescription>
          <PinThinDescription>{closingTime}</PinThinDescription>
        </PinMoreInfoContainer>
      </Callout>
    </Marker>
  );
};

const PinMarker = React.memo(Pin);
export default PinMarker;
