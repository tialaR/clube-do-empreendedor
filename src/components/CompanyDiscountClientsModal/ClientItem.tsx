import React, {memo, useCallback, useMemo} from 'react';
import {
  ClientItemButton,
  ClientItemNameContainer,
  ClientItemName,
  SeeMoreInformationsContainer,
  SeeMoreInformations,
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
    if (isCupomValid && isCupomBought === false) {
      onPress();
    }
  }, [isCupomValid, isCupomBought]);

  const cupomSituationText = useMemo(() => {
    if (isCupomValid && isCupomBought === false) {
      return 'Compra pendente';
    }

    if (isCupomValid && isCupomBought) {
      return 'Produto comprado';
    }

    if (isCupomValid === false) {
      return 'Produto expirado';
    }
  }, [isCupomBought, isCupomValid]);

  const cupomSituation = useMemo(() => {
    if (isCupomValid && isCupomBought === false) {
      return 'pending';
    }

    if (isCupomValid && isCupomBought) {
      return 'bought';
    }

    if (isCupomValid === false) {
      return 'expired';
    }
  }, [isCupomBought, isCupomValid]);

  const isSeeMoreInformationsButton = useMemo(() => {
    if (isCupomValid && isCupomBought === false) {
      return false;
    }

    if (isCupomValid && isCupomBought) {
      return true;
    }

    if (isCupomValid === false) {
      return true;
    }
  }, [isCupomValid, isCupomBought]);

  return (
    <ClientItemButton onPress={handleShowMoreInformations}>
      <ClientItemNameContainer>
        <ClientItemName>{name}</ClientItemName>

        <CupomSituation situation={cupomSituation}>
          {cupomSituationText}
        </CupomSituation>
      </ClientItemNameContainer>

      <SeeMoreInformationsContainer>
        <SeeMoreInformations disabled={isSeeMoreInformationsButton}>
          Ver mais informações
        </SeeMoreInformations>
      </SeeMoreInformationsContainer>
    </ClientItemButton>
  );
};

export default memo(ClientItem);
