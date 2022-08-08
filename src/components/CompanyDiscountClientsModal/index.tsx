import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, View} from 'react-native';

import IconButton from '../IconButton';
import ClientItem from './ClientItem';

import {DiscountClient} from '../../services/company/types';

import {colors} from '../../styles/colors';
import {
  LoadingPrimary,
  SpacingY,
  TextsSkeletonLoading,
} from '../../styles/globalStyles';
import {
  Overlay,
  Container,
  ProductContainer,
  ContainerIconButton,
  DiscountClientsList,
  ClientMoreInformationContainer,
  DescriptionsContainer,
  ClientName,
  Title,
  Description,
  DiscountClientsListTitle,
  DiscountClientsTitleContainer,
} from './styles';

const listLoadingNumbersAux = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const renderListLoading = () => (
  <>
    <TextsSkeletonLoading width={200} />
    <SpacingY large />
    <SpacingY large />
    {listLoadingNumbersAux.map(() => (
      <>
        <TextsSkeletonLoading width={260} thin />
        <SpacingY small />
      </>
    ))}
  </>
);
const ListLoading = () => renderListLoading();

export type DiscountClientsModalHandlersToFather = {
  openModal: () => void;
  closeModal: () => void;
};

type Props = {
  onClose: () => void;
  discountClients: DiscountClient[];
  isLoading?: boolean;
};

const CompanyDiscountClientsModal: React.ForwardRefRenderFunction<
  DiscountClientsModalHandlersToFather,
  Props
> = ({onClose, discountClients, isLoading = false}: Props, ref) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [showClientMoreInformation, setShowClientMoreInformation] =
    useState(false);
  const [currentClientSelected, setCurrentClientSelected] = useState<
    DiscountClient | undefined
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

  const handleSelectClient = (client: DiscountClient) => {
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
            <IconButton
              name="close"
              color={colors.indigoA200}
              width={30}
              height={30}
              onPress={handleClose}
            />
          </ContainerIconButton>
          <View style={{flex: 1, width: '100%'}}>
            {!showClientMoreInformation && (
              <>
                {discountClients ? (
                  <>
                    <DiscountClientsTitleContainer>
                      <DiscountClientsListTitle>
                        CLIENTES COM DESCONTO
                      </DiscountClientsListTitle>
                      {isLoading && <LoadingPrimary />}
                    </DiscountClientsTitleContainer>

                    <DiscountClientsList<React.ElementType>
                      data={discountClients}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(client: DiscountClient) => client?.id}
                      renderItem={({item}: {item: DiscountClient}) => (
                        <ClientItem
                          name={item?.name}
                          isCupomValid={Boolean(item?.isCupomValid)}
                          isCupomBought={Boolean(item?.bought)}
                          onPress={() => handleSelectClient(item)}
                        />
                      )}
                      ItemSeparatorComponent={() => <SpacingY medium />}
                    />
                  </>
                ) : (
                  <ListLoading />
                )}
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
