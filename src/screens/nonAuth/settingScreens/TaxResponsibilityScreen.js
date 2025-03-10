import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const TaxResponsibilityScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <BackArrow goBack={onGoBackHandler} />
          <Header
            headerTitle={
              AppLocalizedStrings.taxResponsibilityScreen.taxResponsibility
            }
          />
          <View style={styles.main}>
            <Text style={styles.para}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ridiculus
              placerat est massa est amet sem nunc ut. Eros, adipiscing nec
              velit ut ut integer. Leo eu suspendisse viverra tellus velit.
              Pellentesque in mi commodo elementum mattis justo consectetur at
              malesuada. Pellentesque commodo duis habitasse congue pulvinar mi.
              Non placerat adipiscing eu porta justo at donec ipsum
              sollicitudin. Urna, pulvinar iaculis etiam imperdiet. Tellus quis
              eget et aliquet consequat tincidunt nibh. Tempor aenean enim vitae
              massa consequat tellus, commodo nunc. Eu lacus, fusce vitae quis.
              Quis nisl urna ultricies sit in eu dui. Augue magna id id augue
              morbi enim. Eget augue in sagittis sed. Ipsum varius tristique
              pulvinar habitasse nibh nunc. Congue nulla viverra congue maecenas
              elementum, odio ornare nisl. Feugiat pellentesque enim, diam
              facilisis purus, vitae auctor facilisi. Sed at lorem dictum arcu
              sed aliquam semper. Donec sit eget massa vitae congue. Urna turpis
              duis quisque ut elementum leo. Lorem est etiam et massa. Nunc
              massa cras sodales urna, ultricies dolor egestas pellentesque.
              Ipsum amet, pellentesque sit eu velit nisi. Integer tempor purus
              lorem sagittis purus feugiat at molestie. Nullam pharetra
              scelerisque interdum et dictum id. Ultricies morbi tempor
              ullamcorper odio cras.
            </Text>
          </View>
        </View>
      </ScrollView>
      <PrimaryButton title={AppLocalizedStrings.taxResponsibilityScreen.cta} />
    </View>
  );
};

export default TaxResponsibilityScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    justifyContent: 'space-between',
  },
  main: {
    marginTop: hp(-5),
  },
  para: {
    color: Colors.Neutral600,
    fontSize: '13@s',
    fontWeight: '400',
    lineHeight: '20@s',
  },
});
