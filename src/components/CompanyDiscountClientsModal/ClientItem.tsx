import React, {memo} from 'react';
import {
  ClientItemButton,
  ClientItemNameContainer,
  ClientItemName,
  SeeMoreInformationsContainer,
  SeeMoreInformations,
} from './styles';

type ClientItemProps = {
  name: string;
  onPress: () => void;
};

const ClientItem: React.FC<ClientItemProps> = ({name, onPress}) => (
  <ClientItemButton onPress={onPress}>
    <ClientItemNameContainer>
      <ClientItemName>{name}</ClientItemName>
    </ClientItemNameContainer>
    <SeeMoreInformationsContainer>
      <SeeMoreInformations>Ver mais informações</SeeMoreInformations>
    </SeeMoreInformationsContainer>
  </ClientItemButton>
);

export default memo(ClientItem);
