import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import IconButton from '../IconButton';

import {colors} from '../../styles/colors';
import {Overlay, Container, ContainerIconButton, MapContainer} from './styles';

export type MapModalHandlersToFather = {
  openModal: () => void;
  closeModal: () => void;
};

type Props = {
  onClose: () => void;
};

type ClientItemProps = {
  name: string;
  onPress: () => void;
};

const MapModal: React.ForwardRefRenderFunction<
  MapModalHandlersToFather,
  Props
> = ({onClose}: Props, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  /* Hook que será utilizado para atualizar a localização da empresa/produto
  buscada na search bar */
  const [region, setRegion] = useState<any>(undefined);
  const [markers, setMarkers] = useState<any>([]); //Lista de marcadores no mapa

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

  const newMarker = (e: any) => {
    let data = {
      key: markers.length,
      coords: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      pinColor: colors.indigoA200,
    };

    //Desloca o usuário para a região clicada no mapa
    setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    //Adicionando novo marcador na lista de marcadores
    setMarkers((oldArray: any) => [...oldArray, data]);
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
            <IconButton icon="x" size={26} onPress={onClose} />
          </ContainerIconButton>
          <MapView
            onMapReady={() => false} // Ação realizada assim que o mapa é carregado (Nesse caso a ação deve ser localizar a empresa ou produto inserido na search bar)
            onPress={newMarker}
            style={{flex: 1}}
            region={region}
            zoomEnabled
            minZoomLevel={17} //Deixa o mapa maios próximo
            showsUserLocation //Mostra a bolinha de onde o usuário está localizado
            loadingEnabled>
            {markers?.map((marker: any) => (
              <Marker
                key={marker.key}
                coordinate={marker.coords}
                pinColor={marker.pinColor}
              />
            ))}
          </MapView>
        </MapContainer>
      </Container>
    </Modal>
  );
};

const ForwardRefMapModal = forwardRef(MapModal);
export default memo(ForwardRefMapModal);
