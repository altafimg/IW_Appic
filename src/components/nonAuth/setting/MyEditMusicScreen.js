import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {useSelector} from 'react-redux';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const MyEditMusicScreen = props => {
  const {my_music} =
    useSelector(
      state => state.getLoggedInUserProfileReducer.data?.data?.data,
    ) || {};

  const renderItem = ({item, index}) => (
    <View key={index}>
      <View style={styles.cardUpperView}>
        <View style={styles.cardMainView}>
          <Image
            source={require('../../../assets/images/rectangle.png')}
            style={styles.musicMainCard}
          />
          <Text style={styles.musicName}>{item}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.musicTitle}>
            {AppLocalizedStrings.viewProfileScreen.myMusic}
          </Text>
          <TouchableOpacity onPress={props.manageMusic}>
            <Text style={styles.seeAllTitle}>{props.seeAll}</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={my_music}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default MyEditMusicScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderColor: Colors.Neutral200,
    paddingBottom: hp(3),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: hp(2),
    marginTop: hp(1.5),
    paddingHorizontal: wp(3),
  },
  musicTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
  },
  seeAllTitle: {
    color: Colors.Primary500,
    fontSize: '13@s',
    fontWeight: '400',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    marginRight: wp(3),
  },
  headerViewSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(-1.5),
    marginBottom: hp(1),
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
    marginLeft: wp(3),
  },
  cardUpperView: {
    height: 153,
    width: 236,
    borderRadius: 8,
    borderColor: '#F7F7F7',
    borderWidth: 2,
    marginHorizontal: 10,
    backgroundColor: '#F7F7F7',
  },
  cardMainView: {
    // flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  musicMainCard: {
    height: 46,
    width: 46,
    borderRadius: 8,
  },
  musicName: {
    fontWeight: '500',
    fontSize: 14,
    color: '#171717',
    // paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
