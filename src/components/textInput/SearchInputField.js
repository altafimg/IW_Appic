import React from 'react';
import {TextInput, View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../theme/Colors';
import SVG from '../../assets/svg';

const SearchInputField = props => {
  return (
    <View style={styles.container}>
      <View style={[props.style, styles.inputContainer]}>
        <SVG.Search />
        <TextInput
          editable={props.editable}
          value={props.value}
          onChangeText={props.onChangeText}
          style={styles.inputStyle}
          placeholder={props.placeholder}
          placeholderTextColor={Colors.Neutral500}
        />
      </View>
    </View>
  );
};

export default SearchInputField;

const styles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.Neutral300,
    width: '100%',
    height: '40@s',
    borderRadius: '5@s',
    paddingHorizontal: 6,
  },
  inputStyle: {
    width: '250@s',
    marginHorizontal: '5@s',
    fontSize: '14@s',
    fontWeight: '400',
    paddingHorizontal: 6,
    color: Colors.Black,
  },
});
