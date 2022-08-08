import React, {memo, useCallback, useMemo} from 'react';
import {
  ClientItemButton,
  ClientItemNameContainer,
  ClientItemName,
  SeeMoreInformationsContainer,
  SeeMoreInformations,
  CupomSituationContainer,
  CupomSituation,
} from './styles';

type ClientItemProps = {
  name: string | null | undefined;
  isCupomValid: boolean;
  isCupomBought: boolean;
  onPress: () => void;
};

const ClientItem: React.FC<ClientItemProps> = ({
  name,
  isCupomValid,
  isCupomBought,
  onPress,
}) => {
  const handleShowMoreInformations = useCallback(() => {
    if (isCupomValid) {
      onPress();
    }
  }, [isCupomValid]);

  const cupomSituation = useMemo(
    () => (isCupomBought ? 'Cupom adquirido' : 'Cupom expirado'),
    [isCupomBought],
  );

  return (
    <ClientItemButton onPress={handleShowMoreInformations}>
      <ClientItemNameContainer>
        <ClientItemName>{name}</ClientItemName>

        <CupomSituation>{cupomSituation}</CupomSituation>
      </ClientItemNameContainer>

      <SeeMoreInformationsContainer>
        <SeeMoreInformations disabled={!isCupomValid}>
          Ver mais informações
        </SeeMoreInformations>
      </SeeMoreInformationsContainer>
    </ClientItemButton>
  );
};

export default memo(ClientItem);
