import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Header from '../../../components/Auth/Header';
import BackArrow from '../../../components/buttons/BackArrow';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';

//images
import checked from '../../../assets/images/checked.png';
import unChecked from '../../../assets/images/unChecked.png';
import NewHeader from '../../../components/NewHeader';
import {hp} from '../../../utility/responsive/ScreenResponsive';

const ReportScreenQuickAd = ({navigation, route}) => {
  const {data, type} = route.params || {};
  const [report, setReport] = useState('');
  const [selected, setSelected] = useState('');
  const [changeHeader, setChangeHeader] = useState(false);

  const reportPoints = [
    {
      id: 1,
      name: 'Abuse, harassment, or threats',
    },
    {
      id: 2,
      name: 'Soliciting',
    },
    {
      id: 3,
      name: 'Violates IW guidelines',
    },
    {
      id: 4,
      name: 'Others',
    },
  ];

  return (
    <View style={styles.container}>
      {changeHeader ? (
        <>
          <Header
            headerTitle={'We’re looking in to your report'}
            subTitle={`Thanks for keeping our platform safe.${'\n'} ${'\n'}We’re going to take a look at this QuickAd and take the most appropriate action.`}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              navigation.goBack();
              // setChangeHeader(false);
            }}
            style={[styles.buttonStyle, {backgroundColor: Colors.Primary500}]}>
            <Text style={[styles.buttonTextStyle, {color: Colors.White}]}>
              {'Back to QuickAds'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <NewHeader
            headerTitle={
              type == 'Standard'
                ? 'Report this QuickAd'
                : AppLocalizedStrings.MessageingScreen.report + ' ' + data?.name
            }
            onPress={() => {
              if (changeHeader) {
                setChangeHeader(false);
              } else {
                navigation.goBack();
              }
            }}
          />
          <Text style={styles.headerSubTitle}>
            {type == 'Standard'
              ? 'Tell us why you are reporting this QuickAd'
              : AppLocalizedStrings.MessageingScreen.tell_us}
          </Text>
          <TextInput
            placeholder="Write..."
            style={styles.inputStyle}
            placeholderTextColor={Colors.Neutral400}
            value={report}
            onChangeText={t => setReport(t)}
            multiline
          />
          <View style={{marginTop: scale(15)}}>
            {reportPoints?.map(data => {
              return (
                <View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      setSelected(data.name);
                    }}
                    style={styles.buttonBoxContainer}>
                    <Image
                      source={selected == data.name ? checked : unChecked}
                      style={styles.iconStyle}
                    />

                    <Text style={styles.textStyle}>{data.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              if (type == 'Standard') {
                setChangeHeader(true);
              } else {
                navigation.navigate('LookingReportScreen');
              }
            }}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>
              {type == 'Standard'
                ? 'Report'
                : AppLocalizedStrings.MessageingScreen.Send_report}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default ReportScreenQuickAd;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
  },
  inputStyle: {
    borderColor: Colors.Neutral300,
    borderWidth: 1,
    height: '195@s',
    textAlignVertical: 'top',
    borderRadius: '4@s',
    paddingHorizontal: '10@s',
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Black,
  },
  textStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Black,
    marginHorizontal: '10@s',
  },
  iconStyle: {width: '24@s', height: '24@s'},
  buttonBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15@s',
  },
  buttonStyle: {
    borderWidth: 2,
    borderRadius: '5@s',
    borderColor: Colors.Primary500,
    height: '54@s',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    bottom: '10@s',
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  buttonTextStyle: {
    color: Colors.Primary500,
    fontSize: '16@s',
    fontWeight: '600',
  },
  headerSubTitle: {
    color: Colors.Neutral700,
    fontSize: '14@s',
    fontWeight: '400',
    paddingTop: hp(0.5),
    marginBottom: hp(5),
    lineHeight: 20,
    marginTop: '13@s',
  },
});
