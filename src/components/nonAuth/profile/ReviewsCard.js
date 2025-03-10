import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SVG from '../../../assets/svg';
import {AppLocalizedStrings} from '../../../localization/Localization';

const music = [
  {
    id: 1,
    image: require('../../../assets/images/rr.png'),
  },
  {
    id: 2,
    image: require('../../../assets/images/rr.png'),
  },
  {
    id: 3,
    image: require('../../../assets/images/rr.png'),
  },
];

const ReviewsCard = props => {
  const Item = ({image}) => (
    <View style={styles.itemMain}>
      <View style={styles.item}>
        <View>
          <Image source={image} style={styles.imageStyle} />
        </View>
        <View>
          <SVG.FiveStar />
          <Text style={styles.serviceTitle}>Service: QuickAds</Text>
          <Text style={styles.serviceTitle}>23 June 2023</Text>
        </View>
      </View>
      <Text style={styles.floydTitle}>Floyd Miles</Text>
      <Text>
        Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
        sint. Velit officia consequat duis enim velit mollit.
      </Text>
    </View>
  );
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <View>
            <Text style={styles.musicTitle}>
              {AppLocalizedStrings.viewProfileScreen.reviews}
            </Text>
          </View>
          <TouchableOpacity onPress={props.onAllReviewsHandler}>
            <Text style={styles.seeAllTitle}>
              {AppLocalizedStrings.viewProfileScreen.seeAll}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listMainView}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={music}
            renderItem={({item}) => <Item image={item.image} />}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default ReviewsCard;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
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
  itemMain: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    width: '290@s',
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(3),
    marginRight: wp(3),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: '60@s',
    height: '60@s',
    borderRadius: 10,
  },
  serviceTitle: {
    color: Colors.Neutral500,
    fontSize: '11@s',
    fontWeight: '400',
    lineHeight: '24@s',
    textAlign: 'right',
  },
  floydTitle: {
    color: Colors.Neutral900,
    fontSize: '16@s',
    fontWeight: '600',
    lineHeight: '24@s',
    paddingVertical: hp(1),
  },
  listMainView: {
    marginLeft: wp(3),
  },
});
