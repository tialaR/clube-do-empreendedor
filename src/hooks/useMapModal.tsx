import React, {ReactNode, useCallback, useRef} from 'react';
import {createContext, useContextSelector} from 'use-context-selector';

import MapModal, {MapModalHandlersToFather} from '../components/MapModal';

type MapModalContextData = {
  showMapModal(): void;
  closeMapModal(): void;
};

const MapModalContext = createContext<MapModalContextData>(
  {} as MapModalContextData,
);

type MapModalProviderProps = {
  children: ReactNode;
};

const MapModalProvider: React.FC<MapModalProviderProps> = ({children}) => {
  const mapModalRef = useRef<MapModalHandlersToFather>(null);

  const showMapModal = useCallback(() => {
    mapModalRef.current?.openModal();
  }, [mapModalRef]);

  const closeMapModal = useCallback(() => {
    mapModalRef.current?.closeModal();
  }, [mapModalRef]);

  const renderMapModal = useCallback(() => {
    return <MapModal ref={mapModalRef} onClose={closeMapModal} />;
  }, [closeMapModal]);

  return (
    <MapModalContext.Provider
      value={{
        showMapModal,
        closeMapModal,
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

  return {
    showMapModal,
    closeMapModal,
  };
}

export {MapModalProvider, useMapModal};
