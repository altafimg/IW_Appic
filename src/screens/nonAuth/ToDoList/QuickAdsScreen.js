import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import SVG from '../../../assets/svg';
import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../theme/Colors';
import {hp, wp} from '../../../utility/responsive/ScreenResponsive';
import {useNavigation} from '@react-navigation/native';
import ToDoHomeScreenHeader from '../../../components/nonAuth/toDoList/ToDoHomeScreenHeader';

const QuickAdsScreen = () => {
  return (
    <View style={styles.container}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <ToDoHomeScreenHeader />
      <View>
        <View>
          <Text> </Text>
        </View>
        <View>
          <SVG.DontHaveID style={styles.donthaveIdImage} />
          <View style={styles.titleView}>
            <Text style={styles.text1}>All clear</Text>
            <Text style={styles.text2}>Just checked There’s nothing here</Text>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default QuickAdsScreen;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp(10),
    backgroundColor: Colors.White,
  },
  donthaveIdImage: {
    alignSelf: 'center',
  },
  titleView: {
    marginTop: hp(4),
  },
  text1: {
    color: Colors.Neutral900,
    fontWeight: '600',
    fontSize: '23@s',
    lineHeight: 27,
    marginVertical: hp(1),
    textAlign: 'center',
  },
  text2: {
    color: Colors.Neutral700,
    fontWeight: '400',
    fontSize: '13@s',
    lineHeight: 18,
    textAlign: 'center',
  },
});
