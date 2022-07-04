import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {SvgIcon} from '../SvgIcon';

import {colors} from '../../styles/colors';

type Props = {
  title: string;
  list: Item[];
  error?: boolean;
  errorText?: string;
  onItemSelect: (item: Item) => void;
};

type Item = {
  label: string;
  value: string;
};

const ExpandableListPanel: React.FC<Props> = ({
  title,
  list,
  error,
  errorText,
  onItemSelect,
}) => {
  const [animation] = useState(new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
  const [maxValueSet, setMaxValueSet] = useState(false);
  const [minValueSet, setMinValueSet] = useState(false);
  const [cardHeight, setCardHeight] = useState(50);

  const [selectedItem, setSelectedItem] = useState<Item | undefined>();

  useEffect(() => {
    const animationId = animation.addListener(({value}: any) => {
      setCardHeight(value);
    });

    return () => {
      animation.removeListener(animationId);
    };
  }, [animation]);

  const toggle = () => {
    // let initialValue = expanded ? maxHeight + minHeight : minHeight;
    let finalValue = expanded ? minHeight : maxHeight + minHeight;

    setExpanded(!expanded);

    Animated.spring(animation, {
      speed: 30,
      velocity: 10,
      toValue: finalValue,
      useNativeDriver: true,
    }).start();
  };

  const _setMaxHeight = () => {
    if (!maxValueSet) {
      setMaxHeight(200);
      setMaxValueSet(true);
    }
  };

  const _setMinHeight = (event: any) => {
    if (!minValueSet) {
      animation.setValue(event.nativeEvent.layout.height);

      setMinHeight(event.nativeEvent.layout.height);
      setMinValueSet(true);
    }
  };

  const handleSelectItem = (item: Item) => {
    onItemSelect(item);
    setSelectedItem(item);
  };

  const renderIcon = () => {
    if (expanded) {
      return (
        <SvgIcon
          name="caretUp"
          color={colors.indigoA200}
          width={44}
          height={44}
        />
      );
    }

    return (
      <SvgIcon
        name="caretDown"
        color={colors.indigoA200}
        width={44}
        height={44}
      />
    );
  };

  return (
    <>
      <Animated.View style={[styles.container, {height: cardHeight}]}>
        <View style={styles.titleContainer} onLayout={_setMinHeight}>
          {selectedItem ? (
            <Text style={styles.title}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}

          <TouchableOpacity style={styles.button} onPress={toggle}>
            {renderIcon()}
          </TouchableOpacity>
        </View>

        <ScrollView
          nestedScrollEnabled
          style={styles.body}
          onLayout={_setMaxHeight}>
          {list.map((item: Item) => (
            <TouchableOpacity
              key={String(item.label)}
              onPress={() => handleSelectItem(item)}
              activeOpacity={0.7}>
              <Text style={styles.title}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
      {error && <Text style={styles.error}>{errorText}</Text>}
    </>
  );
};

var styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    flex: 1,
    padding: 10,

    color: colors.indigoA200,

    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,

    paddingRight: 10,
    paddingLeft: 30,

    justifyContent: 'center',
  },
  buttonImage: {
    width: 30,
    height: 25,
  },
  body: {
    height: 0,
  },
  error: {
    color: colors.red,
    fontSize: 12,

    paddingTop: 4,
    paddingBottom: 18,
    paddingLeft: 16,
  },
});

export default ExpandableListPanel;
