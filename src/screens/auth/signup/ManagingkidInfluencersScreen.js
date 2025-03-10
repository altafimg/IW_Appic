import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import {ScaledSheet} from 'react-native-size-matters';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const ManagingkidInfluencersScreen = ({navigation, route}) => {
  const {user_role} = route.params || {};

  const onGoBackHandler = () => {
    navigation.replace('SignupScreen');
  };
  const onkidsDetailHandler = () => {
    navigation.navigate('KidsDetailsScreen', {user_role});
  };

  const guidelinesData = [
    {
      text: AppLocalizedStrings.managingkidInfluencersScreen.purchases,
    },
    {
      text: AppLocalizedStrings.managingkidInfluencersScreen.local,
    },
    {
      text: AppLocalizedStrings.managingkidInfluencersScreen.app,
    },
    {
      text: AppLocalizedStrings.managingkidInfluencersScreen.kids,
    },
  ];
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header
        headerTitle={
          AppLocalizedStrings.managingkidInfluencersScreen.ManagingKid
        }
        subTitle={
          AppLocalizedStrings.managingkidInfluencersScreen.accountManagers
        }
      />
      <FlatList
        data={guidelinesData}
        renderItem={({item}) => {
          return (
            <View style={styles.cardView}>
              <Image
                source={require('../../../assets/images/rr.png')}
                style={styles.image}
              />
              <View style={styles.textView}>
                <Text style={styles.title}>{item?.text}</Text>
              </View>
            </View>
          );
        }}
      />

      <PrimaryButton
        title={AppLocalizedStrings.managingkidInfluencersScreen.agree}
        onPress={onkidsDetailHandler}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('UnfortunatelyScreen', {
            user_role,
          })
        }>
        <Text style={styles.buttonTitle}>
          {AppLocalizedStrings.managingkidInfluencersScreen.iDontAgree}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManagingkidInfluencersScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
  },
  cardView: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: '5@s',
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  image: {
    width: '45@s',
    height: '45@s',
  },
  textView: {
    width: '257@s',
    alignItems: 'center',
  },
  title: {
    color: Colors.Neutral700,
    fontSize: '12@s',
    fontWeight: '500',
    lineHeight: '18@s',
  },
  button: {
    backgroundColor: Colors.White,
    width: wp('93%'),
    height: hp(6),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Primary500,
    marginTop: hp(1.5),
  },
  buttonTitle: {
    color: Colors.Primary500,
    textAlign: 'center',
    fontSize: '14@s',
    fontWeight: '600',
  },
});
