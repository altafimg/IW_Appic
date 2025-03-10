import React, {useEffect, useRef} from 'react';
import {Animated, Text, View, StyleSheet} from 'react-native';
import SVG from '../assets/svg';

const FailedAddedToast = ({message, backgroundColor, color}) => {
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
    }, 3000); // Disappear after 6 seconds
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {backgroundColor: backgroundColor, opacity: fadeAnim},
      ]}>
      <SVG.FailIcon width={16} height={16} />
      <Text style={[styles.message, {color: color}]}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    // position: 'absolute',
    borderRadius: 10,
    height: 56,
    // padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    // zIndex: 9999, // Ensure it's above other content
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default FailedAddedToast;
