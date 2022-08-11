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
    //TODO - rever regra
    if (isCupomValid) {
      onPress();
    }
  }, [isCupomValid]);

  const cupomSituation = useMemo(() => {
    if (isCupomValid && isCupomBought === false) {
      return 'Compra pendente'; //Roxo
    }

    if (isCupomValid && isCupomBought) {
      return 'Produto comprado'; //Verde
    }

    if (isCupomValid === false) {
      return 'Produto expirado'; //Vermelho
    }
  }, [isCupomBought, isCupomValid]);

  const isSeeMoreInformationsButtonDisabled = useMemo(() => {
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

        <CupomSituation>{cupomSituation}</CupomSituation>
      </ClientItemNameContainer>

      <SeeMoreInformationsContainer>
        <SeeMoreInformations disabled={isSeeMoreInformationsButtonDisabled}>
          Ver mais informações
        </SeeMoreInformations>
      </SeeMoreInformationsContainer>
    </ClientItemButton>
  );
};

export default memo(ClientItem);
