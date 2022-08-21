import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import IconButton from '../IconButton';
import RoundIconButton from '../RoundIconButton';
import PinMarker from './PinMarker';

import {CompanyInformations} from '../../services/company/types';

import {openFacebook, openInstagram, openWhatsapp} from '../../utils/deepLinks';

import {
  Overlay,
  Container,
  ContainerIconButton,
  MapContainer,
  FooterButtonsContainer,
} from './styles';
import {SpacingX} from '../../styles/globalStyles';
import {colors} from '../../styles/colors';

export type MapModalHandlersToFather = {
  openModal: () => void;
  closeModal: () => void;
};

type Props = {
  companyInformations: CompanyInformations;
  onClose: () => void;
};

type PinProps = {
  id: string;
  name: string;
  description: string;
  address: string;
  openingTime: string;
  closingTime: string;
  coords: {
    latitude: number;
    longitude: number;
  };
};

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const MapModal: React.ForwardRefRenderFunction<
  MapModalHandlersToFather,
  Props
> = ({onClose, companyInformations}: Props, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [region, setRegion] = useState<Region | undefined>(undefined);
  const [marker] = useState<PinProps>({
    id: String(companyInformations?.store),
    name: companyInformations?.store ?? '-',
    coords: {
      latitude: companyInformations?.latitude,
      longitude: companyInformations?.longitude,
    },
    address: companyInformations?.address ?? '-',
    description: companyInformations?.description ?? '-',
    openingTime: companyInformations?.openingTime
      ? `Abre ás ${companyInformations?.openingTime}`
      : '',
    closingTime: companyInformations?.closingTime
      ? `Fecha ás ${companyInformations?.closingTime}`
      : '',
  });

  useEffect(() => {
    findCompany();
  }, []);

  const findCompany = useCallback(() => {
    setRegion({
      latitude: companyInformations?.latitude,
      longitude: companyInformations?.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  }, [companyInformations]);

  const openModal = useCallback(() => {
    setIsVisibleModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsVisibleModal(false);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openModal,
      closeModal,
    };
  });

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisibleModal}
      style={{position: 'relative'}}>
      <Overlay />
      <Container>
        <MapContainer>
          <ContainerIconButton>
            <IconButton
              name="close"
              color={colors.indigoA200}
              width={30}
              height={30}
              onPress={onClose}
            />
          </ContainerIconButton>

          <MapView
            provider={PROVIDER_GOOGLE}
            onMapReady={() => false}
            style={{flex: 1}}
            region={region}
            zoomEnabled
            minZoomLevel={17}>
            <PinMarker
              key={marker?.id}
              id={marker?.id}
              name={marker?.name}
              coords={marker?.coords}
              address={marker?.address}
              description={marker?.description}
              openingTime={marker?.openingTime}
              closingTime={marker?.closingTime}
            />
          </MapView>

          <FooterButtonsContainer>
            <RoundIconButton
              type="whatsapp"
              onPress={() =>
                openWhatsapp({phone: companyInformations?.whatsapp ?? ''})
              }
            />
            <SpacingX tiny />
            <RoundIconButton
              type="instagram"
              onPress={() =>
                openInstagram({
                  instagram: companyInformations?.instagram ?? '',
                })
              }
            />
            <SpacingX tiny />
            <RoundIconButton
              type="facebook"
              onPress={() =>
                openFacebook({facebook: companyInformations?.facebook ?? ''})
              }
            />
          </FooterButtonsContainer>
        </MapContainer>
      </Container>
    </Modal>
  );
};

const ForwardRefMapModal = forwardRef(MapModal);
export default memo(ForwardRefMapModal);
