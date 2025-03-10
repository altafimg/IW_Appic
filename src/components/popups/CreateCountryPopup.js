import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {CheckBox, Divider, Overlay} from 'react-native-elements';
import SVG from '../../assets/svg';
import {hp} from '../../utility/responsive/ScreenResponsive';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import checked from '../../assets/images/checked.png';
import unChecked from '../../assets/images/unChecked.png';

const CreateCountryPopup = ({
  countryVisible,
  setCountryVisible,
  filteredData,
  setSelectedCountry,
  selectedCountry,
  setCountry,
  setCountryCode,

  setState,
  setSelectedState,
  setSearchState,
  setCity,
  setSelectedCity,
  setSearchCity,
}) => {
  return (
    <Overlay
      onRequestClose={() => setCountryVisible(false)}
      onBackdropPress={() => setCountryVisible(false)}
      isVisible={countryVisible}
      overlayStyle={[styles.overlayContainer]}>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View>
          <View>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setCountryVisible(false)}>
                <SVG.Cross width={24} height={24} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Target Countries</Text>
              <Text style={styles.headerSubTitle}>Reset</Text>
            </View>
            <Divider style={styles.divider} />
          </View>
        </View>
        <ScrollView style={{flex: 1, height: '100%'}}>
          {filteredData?.map((item, index) => {
            return (
              <>
                <View key={index} style={{flexDirection: 'row'}}>
                  <CheckBox
                    containerStyle={styles.CheckBoxContainer}
                    wrapperStyle={{
                      right: 10,
                    }}
                    checkedIcon={
                      <Image
                        source={checked}
                        style={{width: scale(24), height: scale(24)}}
                      />
                    }
                    uncheckedIcon={
                      <Image
                        source={unChecked}
                        style={{width: scale(24), height: scale(24)}}
                      />
                    }
                    checked={selectedCountry === item?.name}
                    onPress={() => {
                      setSelectedCountry(item?.name); // Ensure it matches the checked condition
                      setCountry(item?.name); // Use `name` for consistency
                      setCountryCode(item?.isoCode);

                      setState('');
                      setSelectedState('');
                      setSearchState('');
                      setCity('');
                      setSelectedCity('');
                      setSearchCity('');
                    }}
                    title={item.name}
                  />
                </View>
                <Divider style={styles.divider} />
              </>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            setCountryVisible(false);
          }}
          activeOpacity={0.6}
          style={[styles.buttonStyle, {marginBottom: hp(3)}]}>
          <Text style={styles.buttonTextStyle}>
            {AppLocalizedStrings.quickAdsHomescreen.Save}
          </Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
};

// label: item.name,
//                     value: item.name,
//                     isoCode: item.isoCode,

export default CreateCountryPopup;

const styles = ScaledSheet.create({
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
    marginTop: '20@s',
  },
  buttonTextStyle: {
    fontWeight: '600',
    fontSize: '16@s',
    color: Colors.White,
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  CheckBoxContainer: {
    right: 10,
    backgroundColor: Colors.White,
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
    color: Colors.Neutral600,
    fontSize: '14@s',
    fontWeight: '400',
  },
  divider: {
    bottom: '20@s',
    top: '1@s',
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    color: Colors.Neutral400,
  },
  backIcon: {
    paddingVertical: hp(3),
  },
  CheckBoxContainer: {
    right: 10,
    backgroundColor: Colors.White,
    // height: '35@s',
    borderWidth: 0,
  },
});
