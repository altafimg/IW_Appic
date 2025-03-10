import React from 'react';
import {Image, Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

const BlogTitleScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header headerTitle={AppLocalizedStrings.blogTitleScreen.blogTitle} />
      <View style={styles.main}>
        <Image
          source={require('../../../assets/images/man.png')}
          style={styles.image}
        />
        <Text style={styles.paragraph}>
          {AppLocalizedStrings.blogTitleScreen.there}
        </Text>
        <Text style={styles.paragraph}>
          {AppLocalizedStrings.blogTitleScreen.all}
        </Text>
      </View>
    </View>
  );
};

export default BlogTitleScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  main: {
    marginTop: hp(-5),
  },
  image: {
    width: '100%',
    height: '179@s',
    borderRadius: 5,
  },
  paragraph: {
    color: Colors.Neutral600,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
    paddingTop: hp(2),
  },
});
