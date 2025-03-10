import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import DetailsTextInput from './DetailsTextInput';
import {hp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';
import {AppLocalizedStrings} from '../../localization/Localization';

const RequestToChangeInput = props => {
  return (
    <View style={styles.inputView}>
      <DetailsTextInput
        title={props.title}
        placeholder={props.placeholder}
        editable={props.editable}
        value={props.value}
      />
      <TouchableOpacity onPress={props.onRequestFirstHandler}>
        <Text style={styles.reqTitle}>
          {AppLocalizedStrings.editProfileScreen.requestChange}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestToChangeInput;

const styles = ScaledSheet.create({
  inputView: {
    marginVertical: hp(1),
  },
  reqTitle: {
    color: Colors.Primary500,
    fontSize: '12@s',
    fontWeight: '600',
    lineHeight: '19@s',
  },
});
