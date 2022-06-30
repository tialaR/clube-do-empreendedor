import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IconButton from '../IconButton';

import {colors} from '../../styles/colors';
import {
  Overlay,
  Container,
  ContainerIconButton,
  MapContainer,
  PinTitle,
  PinDescription,
  PinMoreInfoContainer,
  PinThinDescription,
  PinContainer,
} from './styles';
import {SpacingY} from '../../styles/globalStyles';

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

  const [showMoreInfo, setShowMoreInfo] = useState(false);

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

  const handlePinPress = () => {
    setShowMoreInfo(!showMoreInfo);
  };

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
            <IconButton icon="x" size={26} onPress={onClose} />
          </ContainerIconButton>
          <MapView
            onMapReady={() => false} // Ação realizada assim que o mapa é carregado (Nesse caso a ação deve ser localizar a empresa ou produto inserido na search bar)
            style={{flex: 1}}
            region={region}
            zoomEnabled
            minZoomLevel={17} //Deixa o mapa maios próximo
            showsUserLocation //Mostra a bolinha de onde o usuário está localizado
            loadingEnabled>
            {markers?.map((marker: PinProps) => (
              <Marker
                key={marker.id}
                title={marker.name}
                coordinate={marker.coords}
                pinColor={colors.indigoA200}
                onSelect={handlePinPress}>
                <PinContainer>
                  <PinTitle colorful>{marker.name}</PinTitle>
                  <SpacingY small />
                  <Icon
                    name="location-on"
                    size={24}
                    color={colors.indigoA200}
                  />
                </PinContainer>
                <Callout tooltip>
                  <PinMoreInfoContainer>
                    <PinTitle>{marker.name}</PinTitle>
                    <SpacingY small />
                    <PinDescription>{marker.description}</PinDescription>
                    <PinThinDescription>
                      {marker.description}
                    </PinThinDescription>
                  </PinMoreInfoContainer>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </MapContainer>
      </Container>
    </Modal>
  );
};

const ForwardRefMapModal = forwardRef(MapModal);
export default memo(ForwardRefMapModal);
