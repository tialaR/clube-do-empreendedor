import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import {colors} from '../../styles/colors';

const screenWidth = Dimensions.get('window').width;

type Props = {
  currentValue: number;
  maxValue: number;
};

const ProgressBar: React.FC<Props> = ({currentValue, maxValue}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const half = Number(100 / maxValue);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(half * currentValue);
  }, [currentValue, half]);

  const progressPercent = animation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [animation, progress, currentValue, maxValue]);

  return (
    <View style={styles.progressBar}>
      <Animated.View style={[styles.inner, {width: progressPercent}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: screenWidth,
    height: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  inner: {
    backgroundColor: colors.white,
  },
});

export default ProgressBar;
