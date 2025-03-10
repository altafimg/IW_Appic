import React, {useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import TranslationSettingsPopup from '../../../components/popups/TranslationSettingsPopup';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import DropDownPicker from 'react-native-dropdown-picker';
import {Divider} from 'react-native-elements';
import * as Progress from 'react-native-progress';
import {AppLocalizedStrings} from '../../../localization/Localization';
import PlatformIcon from '../../../components/nonAuth/QuickAds/PlatformIcon';
import {useNavigation} from '@react-navigation/native';

// image
import translateWhiteIcon from '../../../assets/images/translateWhiteIcon.png';
import chatRoomHeaderIcon from '../../../assets/images/chatRoomHeaderIcon.png';
import leftWhiteIcon from '../../../assets/images/leftWhiteIcon.png';
import McDonaldsIcon from '../../../assets/images/McDonaldsIcon.png';
import rectangle from '../../../assets/images/rectangle.png';

const ChatRoomScreen = () => {
  const navigation = useNavigation();
  const [visiable, setVisiable] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('All');
  const [items, setItems] = useState([
    {label: 'All', value: 'All'},
    {label: 'In progress', value: 'in progress'},
    {label: 'Completed', value: 'Completed'},
    {label: 'Partially completed', value: 'Partially completed'},
    {label: 'Cancelled by IW admin', value: 'Cancelled by IW admin'},
    {label: 'Cancelled by the customer', value: 'Cancelled by the customer'},
    {label: 'Failed to deliver', value: 'Failed to Deliver'},
    {label: 'Expired', value: 'expired'},
  ]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.directionStyleFirst}>
          <View style={styles.directionStyle}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={leftWhiteIcon} />
            </TouchableOpacity>
            <Image source={chatRoomHeaderIcon} />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setVisiable(true);
              }}>
              <Image source={translateWhiteIcon} style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.chatTitleHeader}>Chat Room</Text>
            <Text style={styles.chatTitleHeaderSubtitle}>
              Tap the message button on a job card to continue or start a
              conversation.
            </Text>
          </View>
        </View>
        <View style={styles.jobDetailsViewTop}>
          <Image source={McDonaldsIcon} />
          <Text style={styles.jobNameTitle}>McDonalds UK</Text>
          <Text style={styles.jobUserNameTitle}>Managed by Johnathon Doe</Text>
          <Text style={styles.jobUserNameTitle}>Last active 3m ago</Text>
        </View>
        <View style={styles.dropDownView}>
          <Text style={styles.buttonTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.showing}
          </Text>
          <DropDownPicker
            style={styles.mainContainer}
            customItemLabelStyle={styles.mainTextStyle}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholderStyle={styles.mainTextStyle}
            placeholder="All"
          />
        </View>

        <View style={styles.dataCardContainer}>
          <View style={{width: scale(300)}}>
            <View style={{flexDirection: 'row'}}>
              <Image source={rectangle} style={styles.cardPhotoStyle} />
              <View
                style={{
                  marginHorizontal: 10,
                  width: scale(215),
                }}>
                <Text style={styles.title}>Customers Name</Text>
                <Text
                  numberOfLines={3}
                  style={[styles.cardDecStyle, {color: Colors.Neutral500}]}>
                  This is the title of the QuickAd, not the description. This is
                  the title of the QuickAd not the des..
                </Text>
              </View>
            </View>
            <Divider
              style={{marginVertical: scale(7), borderColor: Colors.Neutral400}}
            />
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Spaces_remaining}
              </Text>
              <Text style={styles.cardNameStyle}>In progress</Text>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.daysLeft}
              </Text>
              <Text style={styles.cardNameStyle}>26 Aug 21 6:30pm BST</Text>
            </View>
            <Divider
              style={{marginVertical: scale(7), borderColor: Colors.Neutral400}}
            />
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Language}
              </Text>
              <View style={styles.langView}>
                <Text style={styles.cardNameStyle}>English</Text>
              </View>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Platform}
              </Text>
              {/* <PlatformIcon platformData={platformData} /> */}
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Followers}
              </Text>
              <Text style={styles.cardNameStyle}>100k+</Text>
            </View>
            <View style={styles.cardDetailContainer}>
              <Text style={styles.cardDecStyle}>
                {AppLocalizedStrings.quickAdsHomescreen.Target}
              </Text>
              <Text style={styles.cardNameStyle}>United States</Text>
            </View>
            <Divider
              style={{marginVertical: scale(7), borderColor: Colors.Neutral400}}
            />
            <View style={styles.cardDetailContainer1}>
              <Text style={styles.cardDecStyle1}>
                {AppLocalizedStrings.quickAdsHomescreen.pay_offer}
              </Text>
              <Text style={[styles.cardDecStyle1, {color: Colors.Neutral900}]}>
                $1,500
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: scale(10),
              }}>
              <TouchableOpacity style={styles.cardButtonStyle}>
                <Text style={styles.cardButtonTextStyle}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  styles.cardButtonStyle,
                  {backgroundColor: Colors.Primary500},
                ]}>
                <Text
                  style={[
                    styles.cardButtonTextStyle,
                    {
                      color: Colors.White,
                    },
                  ]}>
                  Updates
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: scale(15)}}>
              <Progress.Bar
                progress={0.5}
                width={scale(290)}
                color={Colors.Primary500}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: scale(7),
                }}>
                <Text style={styles.progresBarTitle}>Accepted</Text>
                <Text style={styles.progresBarTitle}>In progress</Text>
                <Text style={styles.progresBarTitle}>Completed</Text>
              </View>
            </View>
          </View>
        </View>

        <TranslationSettingsPopup
          visiable={visiable}
          setVisiable={setVisiable}
        />
      </ScrollView>
    </View>
  );
};

export default ChatRoomScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  iconStyle: {
    width: '24@s',
    height: '24@s',
  },
  directionStyleFirst: {
    backgroundColor: Colors.Primary500,
  },
  directionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: hp(2),
  },
  chatTitleHeader: {
    fontSize: '18@s',
    fontWeight: '600',
    color: Colors.White,
    textAlign: 'center',
  },
  chatTitleHeaderSubtitle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: Colors.White,
    textAlign: 'center',
    paddingTop: hp(1.5),
    paddingBottom: hp(7),
  },
  jobDetailsViewTop: {
    alignItems: 'center',
    marginTop: hp(-3.5),
  },
  jobNameTitle: {
    fontSize: '14@s',
    fontWeight: '500',
    color: Colors.Black,
    paddingTop: hp(1),
  },
  jobUserNameTitle: {
    fontSize: '14@s',
    fontWeight: '400',
    color: '#808080',
    paddingTop: hp(0.8),
  },
  dropDownView: {
    marginTop: scale(10),
    marginBottom: scale(10),
    zIndex: 1,
    paddingHorizontal: '10@s',
  },
  buttonTextStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral600,
    marginBottom: hp(-1),
    marginTop: hp(1),
  },
  mainContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '5@s',
    height: '16@s',
    marginTop: '10@s',
  },
  mainTextStyle: {
    fontWeight: '400',
    color: Colors.Neutral900,
    fontSize: '14@s',
  },
  dropDownContainerStyle: {
    backgroundColor: Colors.White,
    marginTop: '12@s',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    borderWidth: 0.5,
    borderColor: Colors.Neutral300,
  },

  cardButtonTextStyle: {
    fontSize: '16@s',
    fontWeight: '600',
    color: Colors.Primary500,
  },
  dataCardContainer: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    marginTop: '15@s',
    paddingHorizontal: '12@s',
    borderRadius: '5@s',
    alignSelf: 'center',
    paddingTop: '15@s',
    paddingBottom: '15@s',
    alignItems: 'center',
    top: hp(3),
  },
  cardPhotoStyle: {
    width: '80@s',
    height: '80@s',
    borderRadius: '15@s',
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  cardNameStyle: {
    color: Colors.Neutral800,
    fontWeight: '600',
    fontSize: '13@s',
  },
  cardDecStyle: {
    color: Colors.Neutral600,
    fontWeight: '400',
    fontSize: '14@s',
  },
  cardDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '5@s',
    marginVertical: '8@s',
  },
  cardDetailContainer1: {
    backgroundColor: '#D1EBFA',
    marginTop: '10@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5@s',
    height: '36@s',
    borderRadius: '5@s',
  },
  cardDecStyle1: {
    color: Colors.Neutral800,
    fontWeight: '400',
    fontSize: '16@s',
  },
  numberTextStyle: {
    backgroundColor: Colors.Primary500,
    height: '20@s',
    width: '20@s',
    borderRadius: '100@s',
    color: Colors.White,
    fontSize: '15@s',
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  title: {
    color: Colors.Neutral800,
    fontSize: '15@s',
    fontWeight: '600',
    lineHeight: '24@s',
    textTransform: 'capitalize',
  },
  progresBarTitle: {
    color: Colors.Black,
  },
  cardButtonStyle: {
    width: '147@s',
    height: '44@s',
    marginTop: hp(1),
    borderWidth: 2,
    borderColor: Colors.Primary500,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
