import React from 'react';
import {View, Text, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import NewHeader from '../../../components/NewHeader';
import greenCheckCircle from '../../../assets/images/greenCheckCircle.png';
import closeRedTodo from '../../../assets/images/closeRedTodo.png';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const ToDoSocialMediaUsageRightsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NewHeader
        headerTitle="Social media Usage Rights "
        onPress={() => navigation.goBack()}
      />
      <View style={styles.main}>
        <View>
          <Text style={styles.peragraph}>
            Content generated can be used by the advertiser on social media
            platforms for promotional purposes only. This includes sharing,
            reposting, and using the content in ads or posts.
          </Text>
          <View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>The customer can</Text>
              <Image source={greenCheckCircle} />
            </View>
            <Text style={[styles.peragraph, {marginBottom: hp(3)}]}>
              This job allows the customer to use the material on their social
              media Profiles but cannot resell or edit and resell the content to
              third parties.
            </Text>
            <Text style={styles.peragraph}>
              Customers can use this content on social media and enable Ads such
              As YouTube Ads if they post it on Youtube. The revenue from these
              Ads will go to the Customer.
            </Text>
          </View>
          <View>
            <View style={styles.headerTitleView}>
              <Text style={styles.headerTitle}>The customer cannot</Text>
              <Image source={closeRedTodo} />
            </View>
            <Text style={styles.peragraph}>
              Sell this material to a third party
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

export default ToDoSocialMediaUsageRightsScreen;

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
  peragraph: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '400',
    lineHeight: 22,
  },
  headerTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4),
    marginBottom: hp(1),
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '14@s',
    fontWeight: '600',
  },
});
