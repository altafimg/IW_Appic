import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {scale, ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import NewHeader from '../../../components/NewHeader';
import {hp} from '../../../utility/responsive/ScreenResponsive';
import {Image} from 'react-native';
import checked from '../../../assets/images/checked.png';
import unChecked from '../../../assets/images/unChecked.png';
import {Divider} from 'react-native-elements';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';

const SelectCurrencyScreen = ({navigation}) => {
  const [selected, setSelected] = useState('');

  const reportPoints = [
    {
      id: 1,
      name: 'USD - United states dollar',
    },
    {
      id: 2,
      name: 'GBP - British pound sterling',
    },
    {
      id: 3,
      name: 'EUR - Euros',
    },
    {
      id: 4,
      name: 'AUD - Australian dollar',
    },
    {
      id: 5,
      name: 'CAD - Canadian dollar',
    },
  ];

  return (
    <View style={styles.container}>
      <NewHeader
        headerTitle="Select Currency"
        onPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>
          This is the currency you will be billed in. This is also the currency
          that your influencers will be paid.
        </Text>
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
                <Divider style={styles.divider} />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <PrimaryButton title={AppLocalizedStrings.button.save} />
    </View>
  );
};

export default SelectCurrencyScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: '10@s',
  },
  headerTitle: {
    color: '#404040',
    fontWeight: '400',
    fontSize: '14@s',
    marginTop: hp(3),
    lineHeight: 23,
  },
  iconStyle: {
    width: '24@s',
    height: '24@s',
  },
  buttonBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@s',
    marginBottom: '10@s',
  },
  textStyle: {
    fontWeight: '400',
    fontSize: '16@s',
    color: Colors.Black,
    marginHorizontal: '10@s',
  },
  divider: {
    bottom: '20@s',
    top: '5@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
});
