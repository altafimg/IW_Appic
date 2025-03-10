import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ScaledSheet, scale} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {AppLocalizedStrings} from '../../../localization/Localization';

//images
import checked from '../../../assets/images/checked.png';
import unChecked from '../../../assets/images/unChecked.png';
import NewHeader from '../../NewHeader';
import {hp} from '../../../utility/responsive/ScreenResponsive';

const ReportMessageScreen = ({navigation, route}) => {
  const {data} = route.params || {};
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
      <NewHeader
        headerTitle={
          AppLocalizedStrings.MessageingScreen.report + ' ' + data?.profile_name
        }
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.headerSubTitle}>
        {AppLocalizedStrings.MessageingScreen.tell_us}
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
          navigation.navigate('BlockedScreen');
        }}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}>
          {AppLocalizedStrings.MessageingScreen.Send_report}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportMessageScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10@s',
    backgroundColor: Colors.White,
  },
  inputStyle: {
    borderColor: Colors.Neutral300,
    borderWidth: 1,
    height: '120@s',
    borderRadius: '4@s',
    paddingHorizontal: '10@s',
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.Black,
    textAlignVertical: 'top',
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
    fontSize: '12@s',
    fontWeight: '400',
    marginBottom: hp(2),
    marginTop: hp(3),
    lineHeight: 20,
  },
});
