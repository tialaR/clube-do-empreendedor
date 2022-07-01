import React from 'react';
import {Modal} from 'react-native';
import LottieView from 'lottie-react-native';

import {SplasScreenAux} from '../../styles/globalStyles';
import {AnimationSizeContainer} from './styles';

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
        <AnimationSizeContainer>
          <LottieView
            source={require('../../assets/teste.json')}
            loop={false}
            autoPlay
            onAnimationFinish={handleAnimationFinish}
          />
        </AnimationSizeContainer>
      </SplasScreenAux>
    </Modal>
  );
};

export default SplashScreen;
