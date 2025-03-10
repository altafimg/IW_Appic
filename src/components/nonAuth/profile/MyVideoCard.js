import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Video from 'react-native-video';
import {useSelector} from 'react-redux';
import SVG from '../../../assets/svg';

const MyVideoCard = props => {
  const {my_video} =
    useSelector(state => state.loginReducer.user?.data?.data) || {};
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
            // source={{uri: item}}
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

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.musicTitle}>
          {AppLocalizedStrings.viewProfileScreen.myVideos}
        </Text>
        <TouchableOpacity onPress={props.onSeeAllVideoHandler}>
          <Text style={styles.seeAllTitle}>{props.seeAll}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerViewSec}>
        <Text style={styles.actingTitle}>
          {AppLocalizedStrings.viewProfileScreen.actingShowreel}
        </Text>
        <TouchableOpacity>
          <Text style={styles.secTitle}>
            {AppLocalizedStrings.viewProfileScreen.musicVideo}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listMainView}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={my_video}
          renderItem={({item, index}) => (
            <VideoItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default MyVideoCard;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(2),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(2),
    paddingHorizontal: wp(3),
  },
  musicTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
  },
  seeAllTitle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
  },
  headerViewSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(-1.5),
    marginBottom: hp(1),
    paddingHorizontal: wp(3),
  },
  actingTitle: {
    color: Colors.Neutral600,
    fontSize: '12@s',
    fontWeight: '400',
  },
  secTitle: {
    color: Colors.Neutral600,
    fontSize: '12@s',
    fontWeight: '400',
  },
  listMainView: {
    marginLeft: wp(2),
  },
  videoContainer: {
    width: wp(70), // Adjust width as needed
    height: hp(25), // Adjust height as needed
    marginRight: wp(2), // Adjust margin as needed
  },
  videoTouchArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundVideo: {
    width: '236@s',
    height: '153@s',
    borderRadius: 10,
    backgroundColor: 'black',
    borderColor: '#D3D3D3',
    backgroundColor: 'black',
  },
  pauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}], // Adjust position of the button
  },
});
