import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp} from '../../utility/responsive/ScreenResponsive';
import {Divider, Overlay} from 'react-native-elements';
import PrimaryButton from '../buttons/PrimaryButton';
import Colors from '../../theme/Colors';
import SVG from '../../assets/svg';

const ContentUsageRightsPopup = props => {
  const contentVisible = props.contentVisible;
  const setContentVisible = props.setContentVisible;
  const userRightsText = props.userRightsText;
  const setUserRightsText = props.setUserRightsText;

  const handleSave = () => {
    if (!userRightsText.trim()) {
      Alert.alert('Validation Error', 'Please fill the input');
    } else {
      setContentVisible(false);
    }
  };

  return (
    <Overlay
      onRequestClose={() => setContentVisible(false)}
      onBackdropPress={() => setContentVisible(false)}
      isVisible={contentVisible}
      overlayStyle={[styles.overlayContainer]}>
      <View style={styles.container}>
        <View>
          <View>
            <View style={styles.containerSec}>
              <TouchableOpacity onPress={() => setContentVisible(false)}>
                <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Custom Usage Rights</Text>
              <Text style={styles.headerSubTitle}>kk</Text>
            </View>
            <Divider style={styles.divider} />
          </View>
          <View>
            <View style={{flexDirection: 'row', marginTop: hp(3)}}>
              <Text style={styles.text}>Explained by the advertiser</Text>
            </View>
            <TextInput
              multiline
              style={styles.textInput}
              placeholder="Write here"
              onChangeText={t => setUserRightsText(t)}
              value={userRightsText}
              placeholderTextColor={Colors.Black}
            />
          </View>
        </View>
        <View style={styles.buttonTopStyle}>
          <PrimaryButton title="Save" onPress={handleSave} />
        </View>
      </View>
    </Overlay>
  );
};

export default ContentUsageRightsPopup;

const styles = ScaledSheet.create({
  overlayContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.White,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleText: {
    width: '100%',
    fontWeight: '600',
    fontSize: '22@s',
    color: Colors.Neutral800,
    textAlign: 'left',
    marginBottom: hp(2),
    marginTop: hp(1),
  },
  textInput: {
    alignSelf: 'center',
    width: '100%',
    height: '310@s',
    borderRadius: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    textAlign: 'left',
    textAlignVertical: 'top',
    padding: 10,
    lineHeight: 20,
    marginTop: 5,
    fontSize: '13@s',
    fontWeight: '400',
    color: Colors.Black,
  },
  Question: {
    fontSize: 15,
    flex: 1,
    color: '#1DA1F2',
  },
  text: {
    fontSize: '13@s',
    color: Colors.Black,
    fontWeight: '500',
  },
  buttonTopStyle: {
    alignSelf: 'center',
    marginBottom: hp(3),
  },
  containerSec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.White,
  },
  headerTitle: {
    color: Colors.Neutral900,
    fontSize: '18@s',
    fontWeight: '600',
  },
  headerSubTitle: {
    color: '#fff',
    fontSize: '12@s',
    fontWeight: '400',
  },
  divider: {
    bottom: '20@s',
    top: '5@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
});
