// import React, {useEffect, useRef} from 'react';
// import {Animated, Text, View, StyleSheet} from 'react-native';
// import SVG from '../assets/svg';

// const AddedCustomToast = ({message, backgroundColor, color}) => {
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 500,
//       useNativeDriver: true,
//     }).start();

//     setTimeout(() => {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 400,
//         useNativeDriver: true,
//       }).start();
//     }, 9000); // Disappear after 3 seconds
//   }, [fadeAnim]);

//   return (
//     <Animated.View
//       style={[
//         styles.toastContainer,
//         {backgroundColor: backgroundColor, opacity: fadeAnim},
//       ]}>
//       <SVG.CheckCircle width={16} height={16} />
//       <Text style={[styles.message, {color: color}]}>{message}</Text>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   toastContainer: {
//     // position: 'absolute',
//     borderRadius: 10,
//     height: 56,
//     padding: 10,
//     alignItems: 'center',
//     flexDirection: 'row',
//     width: '100%',
//     flex: 1,
//     position: 'relative',
//   },
//   message: {
//     textAlign: 'center',
//     fontSize: 16,
//     paddingLeft: 10,
//   },
// });

// export default AddedCustomToast;

import React, {useEffect, useRef} from 'react';
import {Animated, Text, View, StyleSheet} from 'react-native';
import SVG from '../assets/svg';

const AddedCustomToast = ({message, backgroundColor, color}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 4000); // Disappear after 9 seconds

    return () => clearTimeout(timer);
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {backgroundColor: backgroundColor, opacity: fadeAnim},
      ]}>
      <SVG.CheckCircle width={16} height={16} />
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

export default AddedCustomToast;
