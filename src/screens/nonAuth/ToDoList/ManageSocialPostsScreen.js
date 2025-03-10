import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import BackArrow from '../../../components/buttons/BackArrow';
import {useNavigation} from '@react-navigation/native';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import Header from '../../../components/Auth/Header';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import SVG from '../../../assets/svg';

const ManageSocialPostsScreen = () => {
  const navigation = useNavigation('');

  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackArrow goBack={onGoBackHandler} />
        <Header headerTitle="Manage Social Posts" />
        <View style={styles.main}>
          <DetailsTextInput title="Enter the URL for a social media post" />
          <Text> </Text>
          <PrimaryButton title="Add" />
          <View style={styles.bottomContainer}>
            <Text style={styles.addedTitle}>Added Posts</Text>
            <View style={styles.cardMainView}>
              <View style={styles.headerCardView}>
                <Text style={styles.urlTitle}>
                  https://instagram.com/annana...
                </Text>
                <SVG.CloseCross color="red" width={23} height={23} />
              </View>
              <Text style={styles.urlTitleSec}>Posted: 17 July 2021</Text>
              <Text style={styles.urlTitleSec}>Updated: 20 July 2022</Text>
              <View style={styles.infoMain}>
                <Image
                  source={require('../../../assets/images/girl.png')}
                  style={styles.image}
                />
                <View style={styles.infoCard}>
                  <View style={styles.infoCradFirst}>
                    <View style={styles.infoView}>
                      <Text style={styles.folowersTitle}>2.6M</Text>
                      <Text style={styles.impressionsTitle}>Impressions</Text>
                    </View>
                    <View style={styles.infoView}>
                      <Text style={styles.folowersTitle}>1.1M+</Text>
                      <Text style={styles.impressionsTitle}>Likes</Text>
                    </View>
                    <View style={styles.infoView}>
                      <Text style={styles.folowersTitle}>48.2K</Text>
                      <Text style={styles.impressionsTitle}>Website Click</Text>
                    </View>
                  </View>
                  <View style={styles.infoCradFirst}>
                    <View style={styles.infoView}>
                      <Text style={styles.folowersTitle}>245K</Text>
                      <Text style={styles.impressionsTitle}>Comments</Text>
                    </View>
                    <View style={styles.infoView}>
                      <Text style={styles.folowersTitle}>121K</Text>
                      <Text style={styles.impressionsTitle}>Swipe ups</Text>
                    </View>
                    <View style={styles.infoView}>
                      <Text style={styles.folowersTitle}>4K</Text>
                      <Text style={styles.impressionsTitle}>Saves</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.activeView}>
                <SVG.OnlinGreenDot width={6} height={6} />
                <Text style={styles.activeTitle}>Active</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ManageSocialPostsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  main: {
    marginTop: hp(-5),
  },
  bottomContainer: {
    marginTop: hp(3),
  },
  cardMainView: {
    borderWidth: 1,
    borderColor: Colors.Neutral200,
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(3),
    marginVertical: hp(1),
  },
  addedTitle: {
    color: Colors.Neutral900,
    fontSize: '17@s',
    fontWeight: '600',
  },
  urlTitle: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
    textDecorationLine: 'underline',
  },
  urlTitleSec: {
    color: Colors.Neutral700,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
  headerCardView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: '110@s',
    height: '130@s',
    marginBottom: hp(1),
  },
  infoMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2),
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(4),
  },
  infoCradFirst: {
    width: '40%',
  },
  infoView: {
    paddingVertical: hp(1),
  },
  folowersTitle: {
    color: Colors.Neutral800,
    fontSize: '12@s',
    fontWeight: '600',
  },
  impressionsTitle: {
    color: Colors.Neutral500,
    fontSize: '11@s',
    fontWeight: '400',
  },
  activeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(9),
  },
  activeTitle: {
    color: Colors.Success500,
    fontSize: '11@s',
    fontWeight: '400',
    paddingHorizontal: wp(1),
  },
});
