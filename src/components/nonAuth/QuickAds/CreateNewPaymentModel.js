import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import {ScaledSheet, scale} from 'react-native-size-matters';
import {AppLocalizedStrings} from '../../../localization/Localization';
import Colors from '../../../theme/Colors';
import {Divider} from 'react-native-elements';

// image
import downArrow from '../../../assets/images/downArrow.png';
import CreateNewPaymentPopup from '../../popups/CreateNewPaymentPopup';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';

const CreateNewPaymentModel = ({
  price,
  setPrice,
  currency,
  setCurrency,
  influencer,
  totelPrice,
  setTotelPrice,
}) => {
  const [paymentExpend, setPaymentExpend] = useState(false);
  const [currencyVisible, setCurrencyVisible] = useState(false);

  useEffect(() => {
    const payment = price * influencer + 100;
    setTotelPrice(payment);
  }, [price, influencer, setTotelPrice]);

  return (
    <View style={[styles.mainBoxStyle1]}>
      <TouchableOpacity
        onPress={() => {
          setPaymentExpend(!paymentExpend);
        }}
        activeOpacity={0.6}
        style={styles.expendButton}>
        <Text style={styles.mainTitleStyle}>
          {AppLocalizedStrings.quickAdsHomescreen.payment}
        </Text>
        <Image
          source={downArrow}
          style={{
            width: scale(24),
            height: scale(24),
            tintColor: paymentExpend ? Colors.Primary500 : null,
            transform: paymentExpend
              ? [{rotate: '180deg'}]
              : [{rotate: '0deg'}],
          }}
        />
      </TouchableOpacity>

      <View style={{marginTop: 10}}>
        {paymentExpend && (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: Colors.Neutral300,
              paddingHorizontal: wp(3),
              paddingVertical: hp(2),
            }}>
            <Text style={styles.quickTitleStyle}>
              {AppLocalizedStrings.quickAdsHomescreen.Payment_offered}
            </Text>
            <View style={styles.paymentContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.boxTextStyle, {right: 3}]}>$</Text>
                <TextInput
                  placeholder="50.00"
                  onChangeText={p => {
                    setPrice(p);
                  }}
                  value={price}
                  keyboardType="number-pad"
                  placeholderTextColor={Colors.Neutral500}
                  style={{
                    height: scale(36),
                    fontSize: scale(15),
                    color: Colors.Neutral900,
                  }}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  onPress={() => {
                    setCurrencyVisible(true);
                  }}
                  style={[
                    styles.boxTextStyle,
                    {color: Colors.Neutral500, fontWeight: '400'},
                  ]}>
                  {currency?.split('-')?.[0]}
                </Text>
                <Image
                  source={downArrow}
                  style={{
                    width: scale(23),
                    height: scale(23),
                    transform: [{rotateZ: '270deg'}],
                  }}
                />
              </View>
            </View>
            {price && influencer ? (
              <>
                <Text
                  style={
                    (styles.messageStyle,
                    {
                      color: Colors.Neutral500,
                      marginBottom: scale(15),
                    })
                  }>
                  {AppLocalizedStrings.quickAdsHomescreen.Per_Influencer}
                </Text>
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: Colors.Neutral100,
                    padding: scale(10),
                    marginBottom: scale(15),
                  }}>
                  <View style={styles.directionRowStyle}>
                    <Text style={styles.quickTitleStyle}>
                      {AppLocalizedStrings.quickAdsHomescreen.summary}
                    </Text>
                    <Text style={{color: Colors.Neutral400}}>
                      {AppLocalizedStrings.quickAdsHomescreen.only_you}
                    </Text>
                  </View>
                  <Divider
                    style={{marginBottom: scale(10), marginTop: scale(10)}}
                  />
                  <View style={styles.directionRowStyle}>
                    <Text
                      style={[
                        styles.quickTitleStyle,
                        {color: Colors.Neutral500},
                      ]}>
                      {price ? `$ ${price} ` : 'Payment'} x
                      {influencer
                        ? ` ${influencer} influencers`
                        : ' Infuencers'}
                    </Text>
                    <Text style={styles.quickTitleStyle}>
                      {'$ ' + price * influencer}
                    </Text>
                  </View>
                  <Divider
                    style={{marginBottom: scale(10), marginTop: scale(10)}}
                  />
                  <View style={styles.directionRowStyle}>
                    <Text
                      style={[
                        styles.quickTitleStyle,
                        {color: Colors.Neutral500},
                      ]}>
                      {AppLocalizedStrings.quickAdsHomescreen.taxes}
                    </Text>
                    <Text style={styles.quickTitleStyle}>${100}</Text>
                  </View>
                  <Divider
                    style={{marginBottom: scale(10), marginTop: scale(10)}}
                  />
                  <View style={styles.directionRowStyle}>
                    <Text
                      style={[styles.quickTitleStyle, {fontSize: scale(16)}]}>
                      {AppLocalizedStrings.quickAdsHomescreen.total_price}
                    </Text>
                    <Text
                      style={[styles.quickTitleStyle, {fontSize: scale(16)}]}>
                      {'$ ' + totelPrice}
                    </Text>
                  </View>
                </View>
              </>
            ) : null}
          </View>
        )}
      </View>

      <CreateNewPaymentPopup
        currencyVisible={currencyVisible}
        setCurrencyVisible={setCurrencyVisible}
        currency={currency}
        setCurrency={setCurrency}
      />
    </View>
  );
};

export default CreateNewPaymentModel;

const styles = ScaledSheet.create({
  mainBoxStyle1: {
    marginTop: '15@s',
    paddingHorizontal: '10@s',
  },
  expendButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 5,
    height: '44@s',
  },
  mainTitleStyle: {
    fontWeight: '600',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
  quickTitleStyle: {
    fontWeight: '500',
    fontSize: '14@s',
    color: Colors.Neutral900,
  },
  paymentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: '5@s',
    borderColor: Colors.Neutral300,
    paddingHorizontal: '10@s',
    marginTop: '10@s',
    marginBottom: '10@s',
  },
  messageStyle: {
    fontWeight: '400',
    fontSize: '14@s',
    color: Colors.White,
  },
  directionRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boxTextStyle: {
    fontWeight: '500',
    fontSize: '15@s',
    color: Colors.Neutral900,
  },
});
