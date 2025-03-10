import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {CheckBox, Divider, Overlay} from 'react-native-elements';
import BackArrow from '../buttons/BackArrow';

// image
import checked from '../../assets/images/checked.png';
import unChecked from '../../assets/images/unChecked.png';
import ContentUsageRightsPopup from './ContentUsageRightsPopup';
import SVG from '../../assets/svg';
import {hp} from '../../utility/responsive/ScreenResponsive';

const CreateNewQuickAdContentUsagePopup = ({
  contentVisible,
  setContentVisible,
  setContentRight,
  contentRight,
  userRightsText,
  setUserRightsText,
  notsContentRights,
  setNotsContentRights,
  ...props
}) => {
  const [currency, setCurrency] = useState('USD - United states dollar');

  return (
    <Overlay
      onRequestClose={() => setContentVisible(false)}
      onBackdropPress={() => setContentVisible(false)}
      isVisible={contentVisible}
      overlayStyle={[styles.overlayContainer]}>
      <View>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setContentVisible(false)}>
            <SVG.BackArrow width={24} height={24} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Usage Rights</Text>
          <Text style={styles.headerSubTitle}>kk</Text>
        </View>
        <Divider style={styles.divider} />
      </View>
      {contentRight == 'Content usage rights' ? (
        <View style={{flexDirection: 'row'}}>
          <BackArrow
            goBack={() => {
              setContentRight(
                AppLocalizedStrings.quickAdsHomescreen.social_license,
              );
            }}
          />
          <Text
            style={[
              styles.boxTextStyle,
              {
                fontSize: scale(20),
                marginTop: scale(10),
                marginHorizontal: scale(10),
              },
            ]}>
            {AppLocalizedStrings.quickAdsHomescreen.content_usage}
          </Text>
        </View>
      ) : null}
      {contentRight == 'Content usage rights' ? (
        <View style={{marginTop: scale(10)}}>
          <Text>{AppLocalizedStrings.quickAdsHomescreen.content_usage}</Text>
          <TextInput
            placeholder="Explained by the advertiser"
            placeholderTextColor={Colors.Neutral300}
            multiline
            style={[
              styles.inputStyle,
              {height: scale(200), textAlignVertical: 'top'},
            ]}
          />
        </View>
      ) : (
        <View style={{marginTop: scale(10)}}>
          <CheckBox
            containerStyle={[
              styles.CheckBoxContainer,
              {height: scale(24), marginTop: 10},
            ]}
            textStyle={{color: Colors.Neutral900}}
            wrapperStyle={{
              right: 10,
              height: scale(24),
              bottom: 10,
            }}
            checkedIcon={
              <Image
                source={
                  contentRight === 'Social media license' ? checked : unChecked
                }
                style={{width: scale(24), height: scale(24)}}
              />
            }
            checked={contentRight}
            onPress={() => {
              setContentRight('Social media license');
            }}
            title="Default Social Media Rights"
          />
          <Text
            style={{
              marginHorizontal: scale(30),
              fontWeight: '400',
              fontSize: scale(13),
              color: Colors.Neutral900,
              marginBottom: hp(1),
            }}>
            Content generated can be used by the advertiser on social media
            platforms for promotional purposes only. This includes sharing,
            reposting, and using the content in ads or posts
          </Text>
          <Divider style={styles.divider} />
          <CheckBox
            containerStyle={[
              styles.CheckBoxContainer,
              {height: scale(24), marginTop: scale(20)},
            ]}
            textStyle={{color: Colors.Neutral900}}
            wrapperStyle={{
              right: 10,
              height: scale(24),
              bottom: 10,
            }}
            checkedIcon={
              <Image
                source={
                  contentRight == 'Custom usage rights' ? checked : unChecked
                }
                style={{width: scale(24), height: scale(24)}}
              />
            }
            checked={currency}
            onPress={() => {
              setContentRight('Custom usage rights');
              setNotsContentRights(true);
            }}
            title="Custom Usage Rights"
          />
          <Text
            style={{
              marginHorizontal: scale(30),
              fontWeight: '400',
              fontSize: scale(13),
              color: Colors.Neutral900,
              marginBottom: hp(1),
            }}>
            By selecting custom usage rights, you will be asked to enter your
            own terms for how you’d like to use the content. This is a direct
            agreement between you and the influencer, and InfluenceWith does not
            provide payment protection or mediation.
          </Text>
        </View>
      )}
      <Divider style={styles.divider} />
      <TouchableOpacity
        onPress={() => {
          setContentVisible(false);
        }}
        activeOpacity={0.6}
        style={[
          styles.buttonStyle,
          {
            position: 'absolute',
            bottom: scale(35),
            width: '100%',
            alignSelf: 'center',
          },
        ]}>
        <Text style={styles.buttonTextStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.Save}
        </Text>
      </TouchableOpacity>
      <ContentUsageRightsPopup
        contentVisible={notsContentRights}
        setContentVisible={setNotsContentRights}
        userRightsText={userRightsText}
        setUserRightsText={setUserRightsText}
      />
    </Overlay>
  );
};

export default CreateNewQuickAdContentUsagePopup;

const styles = ScaledSheet.create({
  inputStyle: {
    height: '36@s',
    marginTop: '6@s',
    borderWidth: 1,
    borderRadius: '3@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: 10,
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    backgroundColor: Colors.White,
    width: '100%',
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
  },
  overlaythumbStyle: {
    backgroundColor: '#A8A29E',
    width: '37@s',
    height: '4@s',
    borderRadius: '2@s',
    alignSelf: 'center',
    marginTop: '10@s',
  },
  buttonStyle: {
    height: '53@s',
    borderRadius: '5@s',
    backgroundColor: Colors.Primary500,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '200@s',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  CheckBoxContainer: {
    right: 10,
    backgroundColor: Colors.White,
    height: '30@s',
    borderWidth: 0,
  },
  container: {
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
