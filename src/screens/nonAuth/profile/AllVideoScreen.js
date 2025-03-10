// import React, {useState} from 'react';
// import {FlatList, Image, Text, View} from 'react-native';
// import {ScaledSheet} from 'react-native-size-matters';
// import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
// import Colors from '../../../theme/Colors';
// import BackArrow from '../../../components/buttons/BackArrow';
// import Header from '../../../components/Auth/Header';
// import Video from 'react-native-video';
// import {useSelector} from 'react-redux';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import SVG from '../../../assets/svg';

// const AllVideoScreen = ({route, navigation}) => {
//   const {my_video} =
//     useSelector(state => state.getUserProfileReducer.data?.data?.data) || {};

//   const [pausedStates, setPausedStates] = useState(my_video?.map(() => true));

//   const handlePause = index => {
//     setPausedStates(prevStates => {
//       const newPausedStates = [...prevStates];
//       newPausedStates[index] = !newPausedStates[index];
//       return newPausedStates;
//     });
//   };
//   const VideoItem = ({item, index}) => {
//     console.log(item);
//     return (
//       <View style={styles.videoContainer}>
//         <TouchableOpacity
//           onPress={() => handlePause(index)}
//           style={styles.videoTouchArea}>
//           <Video
//             source={{uri: item}}
//             style={styles.backgroundVideo}
//             paused={pausedStates[index]}
//             resizeMode="cover"
//             repeat={true}
//           />
//           <View style={styles.pauseButton}>
//             {pausedStates[index] ? <SVG.PlayCircle /> : null}
//           </View>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   const onGoBackHandler = () => {
//     navigation.goBack('');
//   };
//   return (
//     <View style={styles.container}>
//       <BackArrow goBack={onGoBackHandler} />
//       <Header headerTitle="All Videos" />
//       <Text style={styles.dd}></Text>
//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         data={my_video}
//         renderItem={({item, index}) => <VideoItem item={item} index={index} />}
//         keyExtractor={(item, index) => index.toString()}
//       />
//     </View>
//   );
// };

// export default AllVideoScreen;

// const styles = ScaledSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.White,
//     paddingHorizontal: wp(3),
//   },
//   item: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   imageStyle: {
//     marginVertical: hp(1),
//     width: '100%',
//     height: '150@s',
//     borderRadius: 5,
//     resizeMode: 'stretch',
//   },
//   dd: {
//     marginTop: hp(-8),
//   },
//   videoContainer: {
//     // width: wp(70), // Adjust width as needed
//     // height: hp(25), // Adjust height as needed
//     marginRight: wp(2), // Adjust margin as needed
//   },
//   videoTouchArea: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   backgroundVideo: {
//     width: '300@s',
//     height: '153@s',
//     borderRadius: 10,
//     backgroundColor: 'black',
//     borderColor: '#D3D3D3',
//   },
//   pauseButton: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: [{translateX: -15}, {translateY: -15}], // Adjust position of the button
//   },
// });

import React, {useState} from 'react';
import {FlatList, View, Dimensions, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SVG from '../../../assets/svg';

const {width: screenWidth} = Dimensions.get('window');

const AllVideoScreen = ({route, navigation}) => {
  const {my_video} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const [pausedStates, setPausedStates] = useState(my_video?.map(() => true));

  const handlePause = index => {
    setPausedStates(prevStates => {
      const newPausedStates = [...prevStates];
      newPausedStates[index] = !newPausedStates[index];
      return newPausedStates;
    });
  };

  const VideoItem = ({item, index}) => {
    return (
      <View style={styles.videoContainer}>
        <TouchableOpacity
          onPress={() => handlePause(index)}
          style={styles.videoTouchArea}>
          <Video
            source={{uri: item}}
            style={styles.backgroundVideo}
            paused={pausedStates[index]}
            resizeMode="cover"
            repeat={true}
          />
          <View style={styles.pauseButton}>
            {pausedStates[index] ? <SVG.PlayCircle /> : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header headerTitle="All Videos" />
      <Text style={styles.dd}></Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={my_video}
        renderItem={({item, index}) => <VideoItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default AllVideoScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    marginVertical: hp(1),
    width: '100%',
    height: '150@s',
    borderRadius: 5,
    resizeMode: 'stretch',
  },
  dd: {
    marginTop: hp(-8),
  },
  videoTouchArea: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundVideo: {
    width: screenWidth * 0.9, // 90% of the screen width
    height: (screenWidth * 0.9 * 9) / 16, // Maintain 16:9 aspect ratio
    borderRadius: 10,
    backgroundColor: 'black',
    borderColor: '#D3D3D3',
  },
  pauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}],
  },
});
