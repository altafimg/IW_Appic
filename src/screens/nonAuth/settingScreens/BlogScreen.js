import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {AppLocalizedStrings} from '../../../localization/Localization';

const BlogScreen = ({navigation}) => {
  const onGoBackHandler = () => {
    navigation.goBack('');
  };
  const onReadMoreHandler = () => {
    navigation.navigate('BlogTitleScreen');
  };
  return (
    <View style={styles.container}>
      <BackArrow goBack={onGoBackHandler} />
      <Header headerTitle={AppLocalizedStrings.blogScreen.blog} />
      <View style={styles.main}>
        <DetailsTextInput placeholder="Search" />
        <View style={styles.cardView}>
          <Image
            source={require('../../../assets/images/man.png')}
            style={styles.image}
          />
          <Text style={styles.cardHeaderTitle}>Blog Title 1</Text>
          <Text style={styles.cardSubTitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quam
            adipiscingtea lorem.
          </Text>
          <TouchableOpacity onPress={onReadMoreHandler}>
            <Text style={styles.readTitle}>
              {AppLocalizedStrings.blogScreen.readMore}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BlogScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
  },
  main: {
    marginTop: hp(-8),
  },
  cardView: {
    marginVertical: hp(2),
  },
  image: {
    width: '100%',
    height: '179@s',
    borderRadius: 5,
  },
  cardHeaderTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
    paddingTop: hp(1),
  },
  cardSubTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
    lineHeight: '20@s',
    paddingVertical: hp(1),
  },
  readTitle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '400',
  },
});
