import React from 'react';
import {Dimensions, Modal} from 'react-native';
import LottieView from 'lottie-react-native';

import {SplasScreenAux} from '../../styles/globalStyles';

type Props = {
  isAppInitialized: boolean;
};

const SplashScreen: React.FC<Props> = ({isAppInitialized}) => {
  const [hasAnimationPlayedOnce, setHasAnimationPlayedOnce] =
    React.useState(false);

  const handleAnimationFinish = () => {
    setHasAnimationPlayedOnce(true);
  };

  const isModalVisible = !(isAppInitialized && hasAnimationPlayedOnce);

  return (
    <Modal visible={isModalVisible} animationType="fade">
      <SplasScreenAux>
        <LottieView
          source={require('../../assets/teste.json')}
          loop={false}
          autoPlay
          onAnimationFinish={handleAnimationFinish}
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          }}
        />
      </SplasScreenAux>
    </Modal>
  );
};

export default SplashScreen;
