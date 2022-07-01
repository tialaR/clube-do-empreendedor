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
import {SpacingX} from '../../styles/globalStyles';

import IconButton from '../IconButton';
import PinMarker from './PinMarker';

import {
  Overlay,
  Container,
  ContainerIconButton,
  MapContainer,
  FooterButtonsContainer,
} from './styles';

export type MapModalHandlersToFather = {
  openModal: () => void;
  closeModal: () => void;
};

type Props = {
  onClose: () => void;
};

type PinProps = {
  id: string;
  name: string;
  description: string;
  openingHours: string;
  coords: {
    latitude: number;
    longitude: number;
  };
};

const markersMock: PinProps[] = [
  {
    id: '1',
    name: 'Engage eletro',
    description:
      'Av. Luís Viana Filho, 8544 Paralela, Salvador - BA, 41730-101',
    openingHours: 'Segunda a Sábado das 8h às 22h',
    coords: {
      latitude: -12.9528,
      longitude: -38.378,
    },
  },
  {
    id: '2',
    name: 'Engage eletro',
    description:
      'Av. Luís Viana Filho, 8544 Paralela, Salvador - BA, 41730-101',
    openingHours: 'Segunda a Sábado das 8h às 22h',
    coords: {
      latitude: -12.9511,
      longitude: -38.3821,
    },
  },
  {
    id: '3',
    name: 'Engage eletro',
    description:
      'Av. Luís Viana Filho, 8544 Paralela, Salvador - BA, 41730-101',
    openingHours: 'Segunda a Sábado das 8h às 22h',
    coords: {
      latitude: -12.95,
      longitude: -38.3752,
    },
  },
  {
    id: '4',
    name: 'Engage eletro',
    description:
      'Av. Luís Viana Filho, 8544 Paralela, Salvador - BA, 41730-101',
    openingHours: 'Segunda a Sábado das 8h às 22h',
    coords: {
      latitude: -12.9491,
      longitude: -38.3771,
    },
  },
];

const MapModal: React.ForwardRefRenderFunction<
  MapModalHandlersToFather,
  Props
> = ({onClose}: Props, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  /* Hook que será utilizado para atualizar a localização da empresa/produto
  buscada na search bar */
  const [region, setRegion] = useState<any>(undefined);
  const [markers] = useState<PinProps[]>(markersMock); //Lista de marcadores no mapa (virá do back)

  /* Hook que será utilizado para carregar a localização da empresa/produto
  buscada na search bar */
  useEffect(() => {
    findCompany();
  }, []);

  const findCompany = () => {
    setRegion({
      latitude: -12.9528,
      longitude: -38.3787,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

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
            <IconButton icon="close" size={26} onPress={onClose} />
          </ContainerIconButton>

          <MapView
            provider={PROVIDER_GOOGLE}
            onMapReady={() => false} // Ação realizada assim que o mapa é carregado (Nesse caso a ação deve ser localizar a empresa ou produto inserido na search bar)
            style={{flex: 1}}
            region={region}
            zoomEnabled
            minZoomLevel={17}>
            {markers?.map((marker: PinProps) => (
              <PinMarker
                key={marker?.id}
                id={marker?.id}
                name={marker?.name}
                coords={marker?.coords}
                description={marker?.description}
                openingHours={marker?.openingHours}
              />
            ))}
          </MapView>

          <FooterButtonsContainer>
            <IconButton icon="whatsapp" roundLight onPress={() => false} />
            <SpacingX tiny />
            <IconButton icon="instagram" roundLight onPress={() => false} />
            <SpacingX tiny />
            <IconButton icon="facebook" roundLight onPress={() => false} />
            <SpacingX tiny />
            <IconButton icon="qrcode" roundLight onPress={() => false} />
          </FooterButtonsContainer>
        </MapContainer>
      </Container>
    </Modal>
  );
};

const ForwardRefMapModal = forwardRef(MapModal);
export default memo(ForwardRefMapModal);
