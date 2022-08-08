import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {Modal, View} from 'react-native';

import IconButton from '../IconButton';
import ClientItem from './ClientItem';
import CheckBox from '../CheckBox';

import {DiscountClient} from '../../services/company/types';
import ServiceCompany from '../../services/company/company.service';

import {colors} from '../../styles/colors';
import {
  ErrorMessage,
  LoadingPrimary,
  SpacingY,
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

export type DiscountClientsModalHandlersToFather = {
  openModal: () => void;
  closeModal: () => void;
};

type Props = {
  onClose: () => void;
};

const CompanyDiscountClientsModal: React.ForwardRefRenderFunction<
  DiscountClientsModalHandlersToFather,
  Props
> = ({onClose}: Props, ref) => {
  const {
    response: discountClients,
    isLoading: isDiscountClientsLoading,
    isFetching: isDiscountClientsFetching,
    isRefetching: isDiscountClientsRefetching,
    isError: isDiscountClientsError,
  } = ServiceCompany.useGetDiscountClients();

  const {
    patchDiscountClientConfirmBuy,
    isError: isDiscountClientConfirmBuyError,
  } = ServiceCompany.usePatchDiscountClientConfirmBuy();

  const generalDiscountClientsLoading = useMemo(
    () =>
      isDiscountClientsLoading ||
      isDiscountClientsFetching ||
      isDiscountClientsRefetching,
    [
      isDiscountClientsLoading,
      isDiscountClientsFetching,
      isDiscountClientsRefetching,
    ],
  );

  const isDiscountClientsListEmpty = useMemo(
    () => discountClients?.length === 0,
    [discountClients?.length],
  );

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [showClientMoreInformation, setShowClientMoreInformation] =
    useState(false);
  const [currentClientSelected, setCurrentClientSelected] = useState<
    DiscountClient | undefined
  >();
  const [checkConfirmBuy, setCheckConfirmBuy] = useState(false);

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
      setCheckConfirmBuy(false);
    } else {
      onClose();
    }
  };

  const handleCheckConfirmBuy = ({
    currentClientSelectedId,
  }: {
    currentClientSelectedId: number;
  }) => {
    if (checkConfirmBuy === false) {
      patchDiscountClientConfirmBuy({
        discountClientId: currentClientSelectedId,
        isBought: true,
        callback: () => {
          setCheckConfirmBuy(true);
        },
      });
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
                <DiscountClientsTitleContainer>
                  <DiscountClientsListTitle>
                    CLIENTES COM DESCONTO
                  </DiscountClientsListTitle>

                  {generalDiscountClientsLoading && <LoadingPrimary />}
                </DiscountClientsTitleContainer>

                {isDiscountClientsError && (
                  <ErrorMessage>
                    Ocorreu algum erro ao tentar mostrar a lista de clientes com
                    desconto. Tente mais tarde.
                  </ErrorMessage>
                )}

                {isDiscountClientsListEmpty && (
                  <ErrorMessage>
                    Lista vazia! Ainda não existem clientes com desconto.
                  </ErrorMessage>
                )}

                <DiscountClientsList<React.ElementType>
                  data={discountClients}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(client: DiscountClient) => client?.id}
                  renderItem={({item}: {item: DiscountClient}) => (
                    <ClientItem
                      name={item?.name ?? 'Nome: -'}
                      isCupomValid={Boolean(item?.isCupomValid)}
                      isCupomBought={Boolean(item?.bought)}
                      onPress={() => handleSelectClient(item)}
                    />
                  )}
                  ItemSeparatorComponent={() => <SpacingY medium />}
                />
              </>
            )}

            {showClientMoreInformation && (
              <ClientMoreInformationContainer>
                <ClientName>
                  {currentClientSelected?.name ?? 'Nome:  - '}
                </ClientName>
                <SpacingY large />

                <DescriptionsContainer>
                  <Title>Produto</Title>
                  <Description>
                    {currentClientSelected?.product ?? '-'}
                  </Description>
                </DescriptionsContainer>
                <SpacingY medium />

                <DescriptionsContainer>
                  <Title>Tefefone</Title>
                  <Description>
                    {currentClientSelected?.telephone ?? '-'}
                  </Description>
                </DescriptionsContainer>
                <SpacingY medium />

                <DescriptionsContainer>
                  <Title>E-mail</Title>
                  <Description>
                    {currentClientSelected?.email ?? '-'}
                  </Description>
                </DescriptionsContainer>
                <SpacingY medium />

                <DescriptionsContainer>
                  <Title>Endereço</Title>
                  <Description>
                    {currentClientSelected?.address ?? '-'}
                  </Description>
                </DescriptionsContainer>

                <SpacingY medium />
                <CheckBox
                  label="Confirmar compra"
                  isChecked={checkConfirmBuy}
                  onChange={() =>
                    handleCheckConfirmBuy({
                      currentClientSelectedId: Number(
                        currentClientSelected?.id,
                      ),
                    })
                  }
                />

                <SpacingY medium />
                {isDiscountClientConfirmBuyError && (
                  <ErrorMessage>
                    Ocorreu algum erro ao tentar confirmnar a compra! Tente
                    novamente mais tarde.
                  </ErrorMessage>
                )}
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
