import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import BackArrow from '../../../components/buttons/BackArrow';
import Header from '../../../components/Auth/Header';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import SecPrimaryButton from '../../../components/buttons/SecPrimaryButton';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {AppLocalizedStrings} from '../../../localization/Localization';
import {useDispatch, useSelector} from 'react-redux';
import {Dropdown} from 'react-native-element-dropdown';
import DetailsTextInput from '../../../components/textInput/DetailsTextInput';

const DeleteMyAccountScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginReducer.token);
  const userId = useSelector(state => state.loginReducer.user.data?.data?._id);
  const [inputData, setInputData] = useState('');
  const [value, setValue] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [showError, setShowError] = useState(false);
  const category = [
    {label: 'No longer using the platform.', value: '1'},
    {label: 'Concerns about data security.', value: '2'},
    {label: 'Updating personal brand image.', value: '3'},
    {label: 'Bad interactions with users/brands.', value: '4'},
    {label: 'Meeting brand contract requirements.', value: '5'},
    {label: 'Shifting focus to other platforms.', value: '6'},
    {label: 'Taking a break from social media.', value: '7'},
    {label: 'Transitioning to a different career path.', value: '8'},
    {label: 'Others', value: '9'},
  ];

  const onGoBackHandler = () => {
    navigation.goBack('');
  };

  const onContinueHandler = () => {
    if (
      (selectedLabel && selectedLabel !== 'Others') ||
      (selectedLabel === 'Others' && inputData.trim() !== '')
    ) {
      setShowError(false);
      navigation.navigate('DeleteMyAccountSecScreen', {
        inputData,
        selectedLabel,
      });
    } else {
      setShowError(true);
    }
  };

  const onChatSupportHandler = () => {
    navigation.navigate('HelpCenterScreen');
  };

  return (
    <View style={styles.container}>
      <View>
        <BackArrow goBack={onGoBackHandler} />
        <Header
          headerTitle={AppLocalizedStrings.deleteMyAccountScreen.deleteAccount}
          subTitle={AppLocalizedStrings.deleteMyAccountScreen.whyDo}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={category}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={AppLocalizedStrings.deleteMyAccountScreen.selectReason}
          value={value}
          onChange={item => {
            setValue(item.value);
            setSelectedLabel(item.label);
            setShowError(false);
          }}
        />

        {showError && (
          <Text style={styles.errorText}>
            {AppLocalizedStrings.deleteMyAccountScreen.please}
          </Text>
        )}

        {value === '9' && (
          <DetailsTextInput
            onChangeText={e => {
              setInputData(e);
            }}
            value={inputData}
          />
        )}
      </View>
      <View>
        <SecPrimaryButton
          title={AppLocalizedStrings.deleteMyAccountScreen.chat}
          onPress={onChatSupportHandler}
        />
        <PrimaryButton
          title={AppLocalizedStrings.button.continue}
          onPress={onContinueHandler}
        />
      </View>
    </View>
  );
};

export default DeleteMyAccountScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: wp(3),
    paddingBottom: hp(3),
    justifyContent: 'space-between',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.9),
    height: '36@s',
  },
  placeholderStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  iconStyle: {
    tintColor: Colors.Neutral800,
  },
  itemTextStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  selectedTextStyle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '400',
  },
  errorText: {
    color: 'red',
    fontSize: '12@s',
    marginTop: hp(1),
    marginLeft: 2,
  },
});
