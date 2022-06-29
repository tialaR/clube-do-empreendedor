import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, View} from 'react-native';
import {SpacingY} from '../../styles/globalStyles';

import IconButton from '../IconButton';

import {
  Overlay,
  Container,
  ProductContainer,
  ContainerIconButton,
  DiscountClientsList,
  ClientItemButton,
  ClientItemName,
  SeeMoreInformations,
  SeeMoreInformationsContainer,
  ClientItemNameContainer,
  ClientMoreInformationContainer,
  DescriptionsContainer,
  ClientName,
  Title,
  Description,
  DiscountClientsListTitle,
} from './styles';

export type DiscountClientsModalHandlersToFather = {
  openModal: () => void;
  closeModal: () => void;
};

type Props = {
  onClose: () => void;
  discountClients: any;
};

type ClientItemProps = {
  name: string;
  onPress: () => void;
};

type Client = {
  id: string;
  name: string;
  product: string;
  telephone: string;
  email: string;
  address: string;
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

const CompanyDiscountClientsModal: React.ForwardRefRenderFunction<
  DiscountClientsModalHandlersToFather,
  Props
> = ({onClose, discountClients}: Props, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [showClientMoreInformation, setShowClientMoreInformation] =
    useState(false);
  const [currentClientSelected, setCurrentClientSelected] = useState<
    Client | undefined
  >();

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

  const handleSelectClient = (client: Client) => {
    setShowClientMoreInformation(true);

    setCurrentClientSelected(client);
  };

  const handleClose = () => {
    if (showClientMoreInformation) {
      setShowClientMoreInformation(false);
    } else {
      onClose();
    }
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisibleModal}
      style={{position: 'relative'}}>
      <Overlay />
      <Container>
        <ProductContainer>
          <ContainerIconButton>
            <IconButton icon="x" size={24} onPress={handleClose} />
          </ContainerIconButton>
          <View style={{flex: 1, width: '100%'}}>
            {!showClientMoreInformation && (
              <>
                <DiscountClientsListTitle>
                  CLIENTES COM DESCONTO
                </DiscountClientsListTitle>
                <DiscountClientsList<React.ElementType>
                  data={discountClients}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(client: any) => client.id}
                  renderItem={({item: client}: {item: any}) => (
                    <ClientItem
                      name={client.name}
                      onPress={() => handleSelectClient(client)}
                    />
                  )}
                  ItemSeparatorComponent={() => <SpacingY medium />}
                />
              </>
            )}

            {showClientMoreInformation && (
              <ClientMoreInformationContainer>
                <ClientName>{currentClientSelected?.name}</ClientName>
                <SpacingY large />

                <DescriptionsContainer>
                  <Title>Produto</Title>
                  <Description>{currentClientSelected?.product}</Description>
                </DescriptionsContainer>
                <SpacingY medium />

                <DescriptionsContainer>
                  <Title>Tefefone</Title>
                  <Description>{currentClientSelected?.telephone}</Description>
                </DescriptionsContainer>
                <SpacingY medium />

                <DescriptionsContainer>
                  <Title>E-mail</Title>
                  <Description>{currentClientSelected?.email}</Description>
                </DescriptionsContainer>
                <SpacingY medium />

                <DescriptionsContainer>
                  <Title>Endereço</Title>
                  <Description>{currentClientSelected?.address}</Description>
                </DescriptionsContainer>
              </ClientMoreInformationContainer>
            )}
          </View>
        </ProductContainer>
      </Container>
    </Modal>
  );
};

const ForwardRefCompanyDiscountClientsModal = forwardRef(
  CompanyDiscountClientsModal,
);
export default memo(ForwardRefCompanyDiscountClientsModal);
