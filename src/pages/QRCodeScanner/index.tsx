import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';

import {
  Container,
  ScanAgainButton,
  ScanAgainButtonText,
  Header,
} from './styles';
import IconButton from '../../components/IconButton';
import {colors} from '../../styles/colors';

export default function QRCodeScanner() {
  const navigation = useNavigation<any>();

  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({type, data}: BarCodeScannerResult) => {
    // The barcode type.
    console.log(type);

    // The information encoded in the bar code.
    console.log(data);

    setScanned(true);
    navigation.navigate('QRCodeRegisterConfirmation');
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
        <ScanAgainButton onPress={() => setScanned(false)}>
          {scanned && (
            <ScanAgainButtonText>Escanear novamente</ScanAgainButtonText>
          )}
        </ScanAgainButton>
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
}
