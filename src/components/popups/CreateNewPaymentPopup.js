import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../localization/Localization';
import Colors from '../../theme/Colors';
import {CheckBox, Divider, Overlay} from 'react-native-elements';

// image
import checked from '../../assets/images/checked.png';
import unChecked from '../../assets/images/unChecked.png';
import SVG from '../../assets/svg';
import {hp} from '../../utility/responsive/ScreenResponsive';

const CreateNewPaymentPopup = props => {
  const currencyVisible = props.currencyVisible;
  const setCurrencyVisible = props.setCurrencyVisible;
  const currency = props.currency;
  const setCurrency = props.setCurrency;

  const currencyArray = [
    {id: 1, name: 'USD - United states dollar'},
    {id: 2, name: 'GBP - British pound sterling'},
    {id: 3, name: 'EUR - Euros'},
    {id: 4, name: 'AUD - Australian dollar'},
    {id: 5, name: 'CAD - Canadian dollar'},
  ];
  return (
    <Overlay
      onRequestClose={() => setCurrencyVisible(false)}
      onBackdropPress={() => setCurrencyVisible(false)}
      isVisible={currencyVisible}
      overlayStyle={[styles.overlayContainer]}>
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View>
          <View>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setCurrencyVisible(false)}>
                <SVG.Cross width={24} height={24} style={styles.backIcon} />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {AppLocalizedStrings.quickAdsHomescreen.Select_currency}
              </Text>
              <Text style={styles.headerSubTitle}>kk</Text>
            </View>
            <Divider style={styles.divider} />
          </View>
          <View style={{padding: 10}}>
            <Text
              style={[
                styles.ageTextStyle,
                {
                  color: Colors.Neutral700,
                  marginBottom: scale(10),
                  lineHeight: 22,
                },
              ]}>
              {AppLocalizedStrings.quickAdsHomescreen.currency_dec}
            </Text>

            <ScrollView
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}>
              {currencyArray.length !== 0 &&
                currencyArray.map((item, index) => {
                  return (
                    <>
                      <View style={{flexDirection: 'row'}} key={index}>
                        <CheckBox
                          containerStyle={[styles.CheckBoxContainer]}
                          wrapperStyle={{
                            right: 10,
                          }}
                          checkedIcon={
                            <Image
                              source={
                                currency == item.name ? checked : unChecked
                              }
                              style={{width: scale(24), height: scale(24)}}
                            />
                          }
                          checked={currency}
                          onPress={() => {
                            setCurrency(item.name);
                          }}
                          title={item.name}
                        />
                      </View>
                      <Divider style={styles.divider} />
                    </>
                  );
                })}
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setCurrencyVisible(false);
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

export default CreateNewPaymentPopup;

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
    marginTop: '200@s',
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
    color: '#fff',
    fontSize: '12@s',
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
});
