import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {BarCodeScanner} from 'expo-barcode-scanner';

import ServiceClient from '../../services/client/client.service';

import {
  Container,
  ScanAgainButton,
  ScanAgainButtonText,
  Header,
} from './styles';
import IconButton from '../../components/IconButton';
import {colors} from '../../styles/colors';

type Props = {
  route: RouteProp<{params: {productId: number; cupomId: number}}, 'params'>;
};

const QRCodeScanner: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<any>();

  const {productId, cupomId} = useMemo(() => route.params, [route]);

  const {postScanQrCode, isLoading, isSuccess, isError} =
    ServiceClient.usePostScanQrCode();

  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState<undefined | string>(undefined);

  useEffect(() => {
    if (isSuccess) {
      setScanned(true);
      navigation.navigate('QRCodeRegisterConfirmation');
    }
  }, [isSuccess, navigation]);

  useEffect(() => {
    if (isError) {
      setError(
        'Ocorreu algum erro ao tentar escanear o QRCode! Tente novamente.',
      );
    }
  }, [isError]);

  const handleBarCodeScanned = () => {
    postScanQrCode({productId, cupomId});
  };

  const onClose = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <Header>
        {isLoading && <ActivityIndicator size="small" color={colors.white} />}

        <ScanAgainButton onPress={() => setScanned(false)}>
          {scanned && (
            <ScanAgainButtonText>Escanear novamente</ScanAgainButtonText>
          )}
        </ScanAgainButton>

        {error && <ScanAgainButtonText>{error}</ScanAgainButtonText>}

        <IconButton
          name="close"
          color={colors.white}
          width={30}
          height={30}
          onPress={onClose}
        />
      </Header>
    </Container>
  );
};

export default QRCodeScanner;
