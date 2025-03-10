import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {useSelector} from 'react-redux';

const AllMusicScreen = ({navigation}) => {
  const {my_music} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const renderItem = ({item}) => (
    <View>
      <View style={styles.cardUpperView}>
        <View style={styles.cardMainView}>
          <Image
            source={require('../../../assets/images/rectangle.png')}
            style={styles.cardBox}
          />
          <Text style={styles.songName}>{item}</Text>
        </View>
      </View>
    </View>
  );
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header headerTitle="All Music" />
      <Text style={styles.dd}></Text>
      <FlatList
        // horizontal
        showsHorizontalScrollIndicator={false}
        data={my_music}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default AllMusicScreen;

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
  cardUpperView: {
    height: 153,
    width: 343,
    borderRadius: 8,
    borderColor: '#F7F7F7',
    borderWidth: 2,
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#F7F7F7',
  },
  cardMainView: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  cardBox: {
    height: 46,
    width: 46,
    borderRadius: 8,
    flexDirection: 'column',
  },
  songName: {
    fontWeight: '500',
    fontSize: 14,
    color: '#171717',
    paddingHorizontal: 10,
  },
});
