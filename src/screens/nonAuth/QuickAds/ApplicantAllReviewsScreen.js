import React from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import SVG from '../../../assets/svg';

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
const ApplicantAllReviewsScreen = ({navigation}) => {
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
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header headerTitle="All Reviews" />
      <Text style={styles.dd}></Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={music}
        renderItem={({item}) => <Item image={item.image} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ApplicantAllReviewsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  itemMain: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    borderRadius: 5,
    paddingVertical: hp(1.7),
    paddingHorizontal: wp(3),
    marginVertical: wp(2),
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
  dd: {
    marginTop: hp(-8),
  },
});
