import React from 'react';
import {View, Text} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import NewHeader from '../../../components/NewHeader';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const ToDoCustomRightsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NewHeader
        headerTitle="Custom rights"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <View>
          <Text style={styles.headerTitle}>
            All parties have mutually agreed to the following:
          </Text>
          <View style={styles.peragraphView}>
            <Text style={styles.peragraph}>
              Content generated can be used by the advertiser on social media
              platforms for promotional purposes only. This includes sharing,
              reposting, and using the content in ads or posts
            </Text>
          </View>
        </View>
        <PrimaryButton
          title="I Understand"
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default ToDoCustomRightsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: '10@s',
  },
  main: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
  },
  peragraphView: {
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 8,
    paddingHorizontal: wp(3),
    paddingBottom: hp(14),
    paddingTop: hp(2),
    marginTop: hp(2),
  },
  peragraph: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: 22,
  },
});
