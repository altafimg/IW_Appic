import React, {useEffect, useRef} from 'react';
import {Animated, Text, View} from 'react-native';

const CustomToast = ({message, backgroundColor, color}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 5000); // Disappear after 5 seconds
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          },
        ],
        position: 'relative',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: backgroundColor,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: color, textAlign: 'center'}}>{message}</Text>
    </Animated.View>
  );
};

export default CustomToast;
