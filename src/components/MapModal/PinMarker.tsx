import React from 'react';
import {Callout, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
  description: string;
  openingHours: string;
  coords: {
    latitude: number;
    longitude: number;
  };
};

const Pin: React.FC<Props> = ({
  id,
  name,
  description,
  openingHours,
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
        <Icon name="location-on" size={42} color={colors.indigoA200} />
      </PinContainer>
      <Callout tooltip>
        <PinMoreInfoContainer>
          <PinTitle>{name}</PinTitle>
          <SpacingY small />
          <PinDescription>{description}</PinDescription>
          <PinThinDescription>{openingHours}</PinThinDescription>
        </PinMoreInfoContainer>
      </Callout>
    </Marker>
  );
};

const PinMarker = React.memo(Pin);
export default PinMarker;
