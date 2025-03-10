import React from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import SVG from '../../../assets/svg';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import BackArrow from '../../../components/buttons/BackArrow';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const SavedTopicsDetailScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <View style={styles.headerView}>
          <Text style={styles.headerTitle}>
            {AppLocalizedStrings.savedTopicsDetailScreen.uk}
          </Text>
          <SVG.Save />
        </View>
        <View>
          <Text style={styles.paragraph}>
            {AppLocalizedStrings.savedTopicsDetailScreen.lorem}
          </Text>
        </View>
      </View>
      <PrimaryButton
        title={AppLocalizedStrings.savedTopicsDetailScreen.follow}
      />
    </View>
  );
};

export default SavedTopicsDetailScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    justifyContent: 'space-between',
    paddingBottom: hp(3),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '21@s',
    fontWeight: '600',
  },
  paragraph: {
    color: Colors.Black,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '19@s',
    paddingTop: hp(4),
    paddingBottom: hp(2),
  },
});
