import React from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {useNavigation} from '@react-navigation/native';

const EditQuickAdOptionsPopup = props => {
  const isOptions = props.isOptions;
  const ad_post = props.ad_post;
  const status = props.status;
  const navigation = useNavigation();

  const helpTimeOut = () => {
    navigation.navigate('HelpCenterScreen');
    props.onModalOptions();
  };
  const cancelQuickAds = () => {
    if (status === 'cancel') {
      Alert.alert('Job already cancelled');
    } else {
      navigation.navigate('CancelQuickadCoustmerScreen', {
        ad_post: ad_post,
      });
      props.onModalOptions();
    }
  };
  const editQuickAds = () => {
    navigation.navigate('EditQuickAdScreen');
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
              <Text style={styles.header}>Options</Text>
              <TouchableOpacity
                style={styles.paragraphView}
                onPress={editQuickAds}>
                <Text style={styles.defaultTitle}>Edit the QuickAd</Text>
                <Text style={styles.paragraph}>
                  You can only make changes if no applicants have applied yet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paragraphView}
                onPress={cancelQuickAds}>
                <Text style={styles.defaultTitle}>Cancel QuickAd</Text>
                <Text style={styles.paragraph}>
                  See what your cancellation options are
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.paragraphView}
                onPress={helpTimeOut}>
                <Text style={styles.defaultTitle}>Help & FAQ’s</Text>
                <Text style={styles.paragraph}>Chat support is available</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default EditQuickAdOptionsPopup;

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
    paddingHorizontal: wp(4),
    paddingTop: hp(7),
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
    marginBottom: hp(3),
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
});
