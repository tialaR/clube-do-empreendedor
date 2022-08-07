import React, {ReactNode, useCallback, useEffect, useRef} from 'react';
import {Alert} from 'react-native';
import {createContext, useContextSelector} from 'use-context-selector';

import MapModal, {MapModalHandlersToFather} from '../components/MapModal';
import ServiceCompany from '../services/company/company.service';

type MapModalContextData = {
  showMapModal(searchedCompanyText: string): void;
  closeMapModal(): void;
  isMapModalLoading: boolean;
};

const MapModalContext = createContext<MapModalContextData>(
  {} as MapModalContextData,
);

type MapModalProviderProps = {
  children: ReactNode;
};

const MapModalProvider: React.FC<MapModalProviderProps> = ({children}) => {
  const mapModalRef = useRef<MapModalHandlersToFather>(null);

  const {
    getCompanyLocation,
    response: companyInformations,
    isSuccess,
    isError,
    isFetching,
  } = ServiceCompany.useGetCompanyLocation();

  useEffect(() => {
    isSuccess && mapModalRef.current?.openModal();
  }, [isSuccess, mapModalRef]);

  useEffect(() => {
    isError &&
      Alert.alert(
        'Ocorreu algum erro ao tentar exibir a localização da loja!',
        'Tente novamente mais tarde.',
        [
          {
            text: 'Ok',
            onPress: () => false,
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => false,
        },
      );
  }, [isError]);

  const showMapModal = useCallback((searchedCompanyText: string) => {
    getCompanyLocation(searchedCompanyText);
  }, []);

  const closeMapModal = useCallback(() => {
    mapModalRef.current?.closeModal();
  }, [mapModalRef]);

  const renderMapModal = useCallback(() => {
    const hasCompanyLocation =
      companyInformations?.latitude && companyInformations?.latitude;

    if (hasCompanyLocation) {
      return (
        <MapModal
          ref={mapModalRef}
          companyInformations={companyInformations}
          onClose={closeMapModal}
        />
      );
    }
  }, [closeMapModal, companyInformations]);

  return (
    <MapModalContext.Provider
      value={{
        showMapModal,
        closeMapModal,
        isMapModalLoading: isFetching,
      }}>
      {children}
      {renderMapModal()}
    </MapModalContext.Provider>
  );
};

function useMapModal(): MapModalContextData {
  const showMapModal = useContextSelector(
    MapModalContext,
    (mapModalContext: MapModalContextData) => mapModalContext.showMapModal,
  );
  const closeMapModal = useContextSelector(
    MapModalContext,
    (mapModalContext: MapModalContextData) => mapModalContext.closeMapModal,
  );
  const isMapModalLoading = useContextSelector(
    MapModalContext,
    (mapModalContext: MapModalContextData) => mapModalContext.isMapModalLoading,
  );

  return {
    showMapModal,
    closeMapModal,
    isMapModalLoading,
  };
}

export {MapModalProvider, useMapModal};
