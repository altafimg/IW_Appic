import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import close from '../../assets/images/close.png';
import {useNavigation} from '@react-navigation/native';

const OptionsPopup = props => {
  const isOptions = props.isOptions;
  const status = props.status;
  const navigation = useNavigation();

  const MessageHandler = () => {
    navigation.navigate('MessageScreen');
    props.onModalOptions();
  };

  const navigateHandler = () => {
    navigation.navigate('HelpCenterScreen');
    props.onModalOptions();
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        isVisible={isOptions}
        onRequestClose={props.onModalOptions}>
        <TouchableWithoutFeedback onPress={props.onModalOptions}>
          <View style={styles.container}>
            <View style={styles.main}>
              <View style={styles.headerView}>
                <Text style={styles.header}>Options</Text>
                <TouchableOpacity onPress={props.onModalOptions}>
                  <Image source={close} style={styles.image} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.paragraphView}
                onPress={MessageHandler}>
                <Text style={styles.defaultTitle}>Message Influencer</Text>
                <Text style={styles.paragraph}>
                  If you have any questions regarding this job
                </Text>
              </TouchableOpacity>
              {status[0] == 'completed' ? (
                <TouchableOpacity
                  style={styles.paragraphView}
                  onPress={props.onModalOptions}>
                  <Text style={styles.defaultTitle}>Edit Review</Text>
                  <Text style={styles.paragraph}>
                    You can update your review.
                  </Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                style={styles.paragraphView}
                onPress={navigateHandler}>
                <Text style={styles.defaultTitle}>Help & FAQ’s</Text>
                <Text style={styles.paragraph}>
                  Live chat support is available 24-7
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default OptionsPopup;

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
    marginBottom: hp(1),
    paddingTop: hp(2),
    paddingLeft: hp(1),
  },
  paragraphView: {
    marginBottom: hp(2),
    paddingLeft: hp(1),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: hp(1.5),
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
    color: Colors.Neutral500,
    paddingBottom: hp(1),
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 30,
    height: 30,
    marginTop: hp(-5),
  },
});
