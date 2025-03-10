import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import Colors from '../../theme/Colors';

const DetailsTextInput = props => {
  return (
    <View style={styles.inputMainView}>
      <View style={styles.titleView}>
        <Text style={styles.textInputTitle}>{props.title}</Text>
        <Text style={styles.frountTitle}>{props.frountTitle}</Text>
      </View>
      <View style={styles.textInputView}>
        <TextInput
          placeholder={props.placeholder}
          editable={props.editable}
          style={[
            styles.textInput,
            {
              backgroundColor: props.backgroundColor,
            },
          ]}
          onChangeText={props.onChangeText}
          autoCapitalize="none" // Disable auto capitalization
          value={props.value}
          secureTextEntry={props.secureTextEntry} // Pass secureTextEntry prop
          maxLength={props.maxLength}
        />
      </View>
    </View>
  );
};

export default DetailsTextInput;

const styles = ScaledSheet.create({
  inputMainView: {
    marginVertical: hp(1),
  },
  titleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputTitle: {
    color: Colors.Neutral900,
    fontSize: '12@s',
    fontWeight: '500',
    paddingBottom: hp(0.6),
  },
  textInputView: {
    height: '43@s',
  },
  frountTitle: {
    color: Colors.Neutral500,
    fontSize: '11@s',
    fontWeight: '400',
  },
  textInput: {
    flex: 1,
    color: Colors.Neutral900,
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    borderRadius: 5,
    height: '43@s',
    paddingHorizontal: wp(2),
    paddingVertical: 15,
  },
});
