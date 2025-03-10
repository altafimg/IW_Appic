import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { ScaledSheet } from 'react-native-size-matters';
import { hp, wp } from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import PrimaryButton from '../buttons/PrimaryButton';

const SocialMediaUsageRightsPopup = props => {
  const isVisible = props.isVisible;

  const onModalOptions = () => {
    setIsOptions(!isOptions);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={isVisible}
        onRequestClose={onModalOptions}>
        <TouchableWithoutFeedback onPress={onModalOptions}>
          <View style={styles.container}>
            <View style={styles.main}>
              <View style={styles.main}>
                <Text style={styles.header}>
                  Social media usage rights explained
                </Text>
                <View style={styles.paragraphView}>
                  <Text style={styles.defaultTitle}>By default</Text>
                  <Text style={styles.paragraph}>
                    All parties have agreed to the following usage rights for
                    the following:
                  </Text>
                  <View style={styles.dotView}>
                    <Text style={styles.dotStyle}>{'\u2B24'}</Text>
                    <Text style={styles.paragraph}>
                      Content produced from this booking
                    </Text>
                  </View>
                  <View style={styles.dotView}>
                    <Text style={styles.dotStyle}>{'\u2B24'}</Text>
                    <Text style={styles.paragraph}>
                      Content produced for this advertisement
                    </Text>
                  </View>
                </View>
                <View style={styles.paragraphView}>
                  <Text style={styles.defaultTitle}>The customer can</Text>
                  <Text style={styles.paragraph}>
                    This job allows the customer to use the material on their
                    social media Profiles but cannot resell or edit and resell
                    the content to third parties
                  </Text>
                  <Text style={styles.paragraph}>
                    Customers can use this content on social media and enable
                    Ads such As YouTube Ads if they post it on Youtube. The
                    revenue from these Ads Will go to the Customer.
                  </Text>
                </View>
                <View style={styles.paragraphView}>
                  <Text style={styles.defaultTitle}>The customer cannot</Text>
                  <Text style={styles.paragraph}>
                    Sell this material to a third party
                  </Text>
                </View>
              </View>
              <PrimaryButton title="I Understand" onPress={onModalOptions} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default SocialMediaUsageRightsPopup;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: wp(-5),
    marginBottom: hp(-2.3),
  },
  main: {
    backgroundColor: Colors.White,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingBottom: hp(4),
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
    paddingTop: hp(4),
  },
  header: {
    fontSize: '20@s',
    fontWeight: '600',
    color: Colors.Black,
    paddingBottom: hp(2.5),
    marginTop: hp(-4),
    marginBottom: hp(2),
  },
  paragraphView: {
    marginBottom: hp(1.5),
  },
  defaultTitle: {
    fontSize: '14@s',
    fontWeight: '600',
    color: Colors.Neutral900,
    paddingBottom: hp(1),
  },
  paragraph: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.Neutral800,
    paddingBottom: hp(1),
  },
  dotView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotStyle: {
    fontSize: 5,
    paddingBottom: hp(0.8),
    paddingRight: wp(1),
  },
});
